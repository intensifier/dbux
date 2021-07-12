import { newLogger } from '@dbux/common/src/log/logger';
import isThenable from '@dbux/common/src/util/isThenable';
import { some } from 'lodash';
import asyncEventCollection from '../data/asyncEventCollection';
import asyncNodeCollection from '../data/asyncNodeCollection';
// import executionContextCollection from './data/executionContextCollection';
// import traceCollection from './data/traceCollection';
// import valueCollection from './data/valueCollection';
import { getBCEContext, isFirstContextInParent, isRootContext } from '../data/dataUtil';
import ThenRef from '../data/ThenRef';
import { getPromiseData, getPromiseId, getPromiseOwnAsyncFunctionContextId, isNewPromise, setPromiseData } from './patchPromise';

/** @typedef { import("./Runtime").default } Runtime */

export class RuntimeThreads1 {
  logger = newLogger('Threads');

  /**
   * @type {number} Maintain thread count
   */
  _maxThreadId = 0;

  floatingPromises = [];

  /**
   * @type {Array.<Map.<number, number>>}
   */
  outEdges = [];
  /**
   * @type {Array.<Map.<number, number>>}
   */
  inEdges = [];
  /**
   * Stores key = realContextId, value = { resumeContextId, rootId } for
   * connecting `preAwait` and `postAwait` events.
   */
  lastAwaitByRealContext = new Map();

  /**
   * TODO: move to `AsyncNodeCollection`
   */
  threadsByRoot = new Map();
  threadFirstRun = new Map();
  lastRootContextByThread = new Map([[1, 1]]);

  /**
   * @type {Runtime}
   */
  _runtime;

  constructor(runtime) {
    this._runtime = runtime;
  }

  // getCurrentRunId() {
  //   return this._runtime.getCurrentRunId();
  // }
  getCurrentVirtualRootContextId() {
    return this._runtime.getCurrentVirtualRootContextId();
  }

  // ###########################################################################
  // preAwait
  // ###########################################################################

  /**
   * Track any created promise (that is the return value of a function or ctor call).
   */
  traceCallPromiseResult(contextId, trace, promise) {
    const currentRootId = this.getCurrentVirtualRootContextId();
    if (!isNewPromise(promise, currentRootId)) {
      // this.logger.warn('have seen promise before', currentRootId, promise._dbux_);
      return;
    }

    const callId = trace.resultCallId;
    const calledContext = getBCEContext(callId);

    let calledContextId;
    let lastAwaitData;

    if (calledContext) {
      calledContextId = calledContext?.contextId;
      lastAwaitData = this.lastAwaitByRealContext.get(calledContextId);
      if (lastAwaitData?.isFirstAwait) { // NOTE: in this case, `isFirstAwait` should always be true, if exists
        // -> this is the return value of `calledContextId`
        // -> this should be the caller of `calledContextId`

        // NOTE: establish async caller chain
        lastAwaitData.returnPromise = promise;
      }
    }

    // register previously unseen promise
    this.recordFloatingPromise(promise, currentRootId, lastAwaitData && calledContextId);

    // if (calledFirstAwaitPromise) {
    //   // const key = { runId, contextId, traceId };
    //   // this.runContextCallTracePromiseMap.set(key, promise);
    //   // this.promiseRunContextTraceMap.set(promise, key);
    // }
  }

  preAwait(awaitArgument, resumeContextId, realContextId, preAwaitTid) {
    const currentRootId = this.getCurrentVirtualRootContextId();
    // this.logger.debug('pre await', awaitArgument);

    // this.floatingPromises.delete(awaitArgument);
    // this.logger.debug('delete floating promise', awaitArgument);


    // TODO: add sync edge
    //    * if nested and promise already has `lastAsyncNode`
    //      -> add an edge from `preEvent` `AsyncNode` to promise's `lastAsyncNode`
    const isFirstAwait = isFirstContextInParent(resumeContextId);

    if (isRootContext(resumeContextId)) {
      // NOTE: this check is only necessary in case of a top-level `await`.
      //    -> since else: `!isFirstAwait` and `postAwait` just occured.
      // make sure that we have a valid threadId
      this.getOrAssignRootThreadId(resumeContextId);
    }

    this.lastAwaitByRealContext.set(realContextId, {
      resumeContextId,
      rootId: currentRootId,
      isFirstAwait,
      preAwaitTid
      // awaitArgument
    });

    if (!isThenable(awaitArgument)) {
      return;
    }

    const nestedAsyncContextId = getPromiseOwnAsyncFunctionContextId(awaitArgument);
    const nestedAsyncData = nestedAsyncContextId && this.lastAwaitByRealContext.get(nestedAsyncContextId);
    if (nestedAsyncContextId && !nestedAsyncData) {
      this.logger.warn(`nestedAsyncData not found for parentContextId=${realContextId}, asyncFunctionContextId=${nestedAsyncContextId}`);
      return;
    }

    // TODO: also add edges for everyone who is not first!
    nestedAsyncData.firstAwaitingAsyncFunctionContextId = realContextId;

    // this.logger.debug('this promise', promise, 'first await', isFirstAwait, 'is root', this.isRootContext(parentContextId));
    // if (!isFirstAwait || isRootContext(parentContextId)) {
    //   const threadId = this.getRootThreadId(currentRootId);
    //   this.setupPromise(awaitArgument, currentRootId, threadId, true);
    // }
  }

  recordFloatingPromise(promise, currentRootId, asyncFunctionContextId) {
    setPromiseData(promise, {
      // NOTE: rootId should already be set by recordPromise
      // rootId: currentRootId,
      // lastRootId: currentRootId,
      asyncFunctionContextId
    });
    this.floatingPromises.push(promise);
  }


  // ###########################################################################
  // postAwait
  // ###########################################################################

  /**
   * TODO: also add a similar (but not the same) logic to `return` value of `async` functions.
   */
  postAwait(awaitContextId, realContextId, postEventContextId, awaitArgument) {
    const {
      resumeContextId: preEventContextId,
      rootId: preEventRootId,
      preAwaitTid,
      returnPromise
    } = this.lastAwaitByRealContext.get(realContextId);

    const postEventRootId = this.getCurrentVirtualRootContextId();
    const preEventThreadId = this.getOrAssignRootThreadId(preEventRootId);

    let fromRootId;
    let fromThreadId;
    let toThreadId;

    const isFirstAwait = isFirstContextInParent(preEventContextId);
    if (!isFirstAwait || this.isAsyncFunctionChainedToRoot(realContextId)) {
      // not first await or chained to root  -> CHAIN
      toThreadId = preEventThreadId;
    }
    else {
      // first await, but caller not chained to root -> FORK
      toThreadId = 0;
    }

    const isNested = isThenable(awaitArgument);
    if (isNested) {
      // nested promise:
      //  -> an out-going edge has already been added from `preEventRootId` to the beginning of that promise
      //  -> we now reel it back in
      ({
        lastRootId: fromRootId,
        threadId: fromThreadId    // NOTE `threadId === getRootThreadId(lastRootId)` is NOT guaranteed!
      } = getPromiseData(awaitArgument));
    }
    else {
      // not nested
      fromRootId = preEventRootId;
      fromThreadId = preEventThreadId;

      // // assign run <-> threadId
      // NOTE: this should probably not happen
      // let fromRootIdThreadId = getRunThreadId(fromRootId);
      // if (!fromRootIdThreadId) {
      //   // this.logger.debug("From run", fromRootId, "is a new run, assign thread id");
      //   fromRootIdThreadId = this.assignRunNewThreadId(fromRootId);
      // }
    }

    if (this.getLastRootContextOfThread(fromThreadId) === postEventRootId) {
      this.logger.warn(
        // eslint-disable-next-line max-len
        `[postAwait] tried to handle postEventRootId more than once for thread ${preEventThreadId}` +
        `getLastRootContextOfThread(startThreadId) === postEventRootId. ` +
        `Runs=${this.debugGetAllRootIdsOfThread(preEventThreadId)} (Skipped).`
      );
    }

    // add edge
    const actualToThreadId = this.addEdge(fromRootId, postEventRootId, fromThreadId, toThreadId, preAwaitTid, isNested);

    // store `actualToThreadId` and `postEventRootId` with `returnPromise`
    if (returnPromise) {
      // NOTE: `returnPromise` is also set for "first await".
      //   this.logger.warn(` "returnPromise" not found in "postAwait":`, realContextId, postEventContextId);
      // }
      // else {
      setPromiseData(returnPromise, {
        threadId: actualToThreadId,
        lastRootId: postEventRootId
      });
    }
  }

  /**
   * This is called `postRun` to process promises that are return values of `async` functions.
   */
  processFloatingPromises() {
    // // this.logger.debug('clean flating promise');
    // const maintainPromiseThreadIdDfs = promise => {
    //   // this.logger.debug('do promise', promise);

    //   console.warn(`floatingPromise`, promise, this.getAsyncCallerPromise(promise));

    //   if (getPromiseOwnThreadId(promise)) {
    //     // this.logger.debug('get own thread id', getPromiseOwnThreadId(promise));
    //     return getPromiseOwnThreadId(promise);
    //   }
    //   const callerPromise = this.getAsyncCallerPromise(promise);

    //   if (callerPromise) {
    //     // this promise participates in an await chain. Does not have "own" threadId.
    //     maintainPromiseThreadIdDfs(callerPromise);
    //   } else {
    //     // floating promise is not bound to root context, and has no further caller
    //     this.setupPromise(promise, rootId, 0, false);
    //   }
    //   // this.logger.debug('promise become', promise);
    //   return getPromiseOwnThreadId(promise);
    // };
    // for (let promise of this.floatingPromises) {
    //   maintainPromiseThreadIdDfs(promise);
    // }
    // this.floatingPromises = [];
    // // this.logger.debug("end clean");
  }

  // ###########################################################################
  // Promises: thenScheduled
  // ###########################################################################

  /**
   * Event: New promise (`postEventPromise`) has been scheduled.
   * @param {ThenRef} thenRef
   */
  thenScheduled(thenRef) {
    const {
      preEventPromise,
      postEventPromise,
      schedulerTraceId
    } = thenRef;

    const rootId = this.getCurrentVirtualRootContextId();
    this.logger.debug(`[thenScheduled] #${rootId} ${getPromiseId(preEventPromise)} -> ${getPromiseId(postEventPromise)} (tid=${schedulerTraceId})`);
  }

  // ###########################################################################
  // Promises: thenExecuted
  // ###########################################################################

  /**
   * Event: Promise has been settled.
   * 
   * @param {ThenRef} thenRef
   */
  thenExecuted(thenRef, returnValue) {
    const {
      preEventPromise,
      postEventPromise,
      schedulerTraceId
    } = thenRef;
    const {
      threadId: preEventThreadId,
      lastRootId: preEventRootId
    } = getPromiseData(preEventPromise);

    // const {
    //   rootId: scheduleRootId
    // } = getPromiseData(postEventPromise);

    const postEventRootId = this.getCurrentVirtualRootContextId();
    const fromThreadId = preEventThreadId;
    let toThreadId;
    const isNested = isThenable(returnValue);

    if (isNested) {
      toThreadId = TODO;
    }
    else {
      // don't chain if is first promise and not chained to root
      if (!isFirstPromise || isPromiseChainedToRoot) {
        // CHAIN
        toThreadId = preEventThreadId;
      }
      else {
        // FORK
        toThreadId = 0;
      }
    }

    const actualToThreadId = this.addEdge(preEventRootId, postEventRootId, fromThreadId, toThreadId, schedulerTraceId, isNested);

    // TODO: also don't set `threadId` on async result promises?
    // TODO: keep set of all "promise dependencies" and resolve on next promise event

    if (!getPromiseData(postEventPromise).threadId) {
      // don't override previous `threadId`
      setPromiseData(postEventPromise, {
        threadId: actualToThreadId
        // lastRootId: postEventRootId
      });
    }
  }


  // ###########################################################################
  // bookkeeping utilities
  // ###########################################################################

  /**
   * Traverse nested awaits, to find out, if outer-most await is in root.
   * @return {boolean}
   */
  isAsyncFunctionChainedToRoot(realContextId) {
    // NOTE: asyncData should always exist, since we are calling this `postAwait`
    const asyncData = this.lastAwaitByRealContext.get(realContextId);

    const {
      // asyncFunctionContextId,
      // threadId,
      // returnPromise,
      firstAwaitingAsyncFunctionContextId
    } = asyncData;

    // NOTE: `this.getAsyncFunctionChainedToRoot` uses firstAwaitingAsyncFunctionContextId
    //    -> what if await, but its not first?
    //    -> TODO: add synchronization links (out and back in)

    if (!firstAwaitingAsyncFunctionContextId) {
      return isRootContext(realContextId);
    }
    else {
      // keep going up
      return this.isAsyncFunctionChainedToRoot(firstAwaitingAsyncFunctionContextId);
    }

    // const parentContextId = getPromiseOwnAsyncFunctionContextId(returnPromise);


    // const chainedToRoot = getPromiseOwnChainedToRoot(promise);
    // if (chainedToRoot !== undefined) {
    //   return chainedToRoot;
    // }

    // const callerPromise = this.getAsyncCallerPromise(promise);
    // if (callerPromise) {
    //   return this.getAsyncCallerPromiseChainedToRoot(callerPromise);
    // }

    // return false;
  }

  /**
   * Used for debugging purposes.
   */
  debugGetAllRootIdsOfThread(threadId) {
    return Array.from(this.threadsByRoot.entries())
      .filter(([, t]) => t === threadId)
      .map(([r]) => r);
  }

  /**
   * Called when a run is finished.
   * @param {number} runId 
   */
  postRun(/* runId, rootContextIds */) {
    // NOTE: note currently necessary
    // for (const rootContextId of rootContextIds) {
    //   if (!this.getRootThreadId(rootContextId)) {
    //     // NOTE: rootContexts without any async event
    //     this.setRootThreadId(rootContextId, this.newThreadId());
    //   }
    // }
    this.processFloatingPromises();
  }

  /**
   * Maintain `threadsByRoot` map.
   * Called by `addEdge`.
   * 
   * @param {number} runId 
   * @param {number} threadId 
   */
  setRootThreadId(rootId, threadId, schedulerTraceId) {
    // const threadLastRun = Math.max(runId, this.lastRootContextByThread.get(threadId) || 0);
    // this.logger.debug(`[${threadId}] set runId=${runId}, threadLastRun=${threadLastRun}`);

    this.threadsByRoot.set(rootId, threadId);

    asyncNodeCollection.addAsyncNode(rootId, threadId, schedulerTraceId);
    // this.lastRootContextByThread.set(threadId, threadLastRun);
  }

  /**
   * 
   */
  getRootThreadId(rootId) {
    return this.threadsByRoot.get(rootId);
  }

  hasEdgesFrom(fromRootId) {
    return !!this.outEdges[fromRootId];
  }

  hasChainFrom(fromRootId) {
    const edges = this.outEdges[fromRootId];
    const fromThreadId = this.getRootThreadId(fromRootId);
    return edges && some(edges.values(), (toRootId) => fromThreadId === this.getRootThreadId(toRootId)) || false;
  }

  hasEdgeFromTo(fromRootId, toRootId) {
    return !!this.outEdges[fromRootId]?.get(toRootId);
  }

  /**
   * @return The new thread id
   */
  newThreadId() {
    // this.logger.debug("assign run new thread id", runId);
    ++this._maxThreadId;
    // eslint-disable-next-line no-console
    this.logger.debug('[newThreadId]', this._maxThreadId);
    return this._maxThreadId;
  }

  /**
   * If given root was started by a recorded async event, threadId is already assigned.
   * If not, we assume a FORK, and assign a new threadId.
   * 
   * TODO: move to `postRun` or `postRoot`?
   */
  getOrAssignRootThreadId(rootId) {
    let threadId = this.getRootThreadId(rootId);
    if (!threadId) {
      // NOTE: this can happen, if a root executed that was not connected to any previous asynchronous events
      //    (e.g. initial root, or caused by unrecorded asynchronous events)
      // this.logger.warn(`Tried to add edge from root ${fromRootId} but it did not have a threadId`);
      // return 0;
      this.setRootThreadId(rootId, threadId = this.newThreadId());
    }
    return threadId;
  }

  /**
   * Add an edge between `fromRootId` and `toRootId`
   * @param {number} fromRootId 
   * @param {number} toRootId 
   */
  addEdge(fromRootId, toRootId, fromThreadId, toThreadId, schedulerTraceId, isNested) {
    const previousFromThreadId = this.getOrAssignRootThreadId(fromRootId);
    const previousToThreadId = this.getRootThreadId(toRootId);

    if (this.hasEdgeFromTo(fromRootId, toRootId)) {
      this.logger.warn(`Tried to add edge twice from ${fromRootId} (t = ${previousFromThreadId} => ${fromThreadId}) to ${toRootId} (t = ${previousToThreadId} => ${toThreadId})`);
      return 0;
    }

    const isFork = !toThreadId ||
      // check if this is CHAIN and fromRoot already has an out-going CHAIN
      // NOTE: this can happen, e.g. when the same promise's `then` was called multiple times.
      (fromThreadId === toThreadId && this.hasChainFrom(fromRootId));

    if (isFork) {
      // fork!
      toThreadId = this.newThreadId();
    }

    if (!previousToThreadId) {
      // toRootId was not assigned to any thread yet
      this.setRootThreadId(toRootId, toThreadId, schedulerTraceId);
    }


    // add edge
    if (!this.outEdges[fromRootId]) {
      this.outEdges[fromRootId] = new Map();
    }
    if (!this.inEdges[toRootId]) {
      this.inEdges[toRootId] = new Map();
    }
    this.outEdges[fromRootId].set(toRootId, 1);
    this.inEdges[toRootId].set(fromRootId, 1);

    asyncEventCollection.addEdge(fromRootId, toRootId);

    // eslint-disable-next-line max-len
    this.logger.debug(`[addEdge] [${fromThreadId !== toThreadId ? `${fromThreadId}->` : ''}${toThreadId}] Roots: ${fromRootId}->${toRootId} (tid=${schedulerTraceId}${isNested ? `, nested` : ''})`);

    return toThreadId;
  }

  /**
   * Get last run of the thread, by `threadLastRun` map
   * @param {number} threadId 
   * @return {number} The last run id of the thread
   */
  getLastRootContextOfThread(threadId) {
    // this.logger.debug("get last run of thread", threadId, "returns", this.threadLastRun.get(threadId));
    return this.lastRootContextByThread.get(threadId);
  }
}