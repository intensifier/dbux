// import EmptyObject from '@dbux/common/src/util/EmptyObject';
// import isThenable from '@dbux/common/src/util/isThenable';
import { newLogger } from '@dbux/common/src/log/logger';
import { isFunction } from 'lodash';
import { peekBCEMatchCallee, getFirstOwnTraceOfRefValue, isInstrumentedFunction, getBCECalleeFunctionRef, getFirstContextAfterTrace, getTraceStaticTrace } from '../data/dataUtil';
import { getOrPatchFunction, getPatchedFunction, monkeyPatchFunctionHolder, monkeyPatchFunctionOverride, monkeyPatchGlobalRaw } from '../util/monkeyPatchUtil';
import executionContextCollection from '../data/executionContextCollection';
import traceCollection from '../data/traceCollection';


/**
 * @see https://stackoverflow.com/a/68708710/2228771
 */
function isClass(value) {
  return typeof value === 'function' && (
    /^\s*class[^\w]+/.test(value.toString()) ||

    // 1. native classes don't have `class` in their name
    // 2. However, they are globals and start with a capital letter.
    (globalThis[value.name] === value && /^[A-Z]/.test(value.name))
  );
}

// eslint-disable-next-line no-unused-vars
const { log, debug: _debug, warn, error: logError, trace } = newLogger('CallbackPatcher');

/** @typedef {import('../RuntimeMonitor').default} RuntimeMonitor */

export default class CallbackPatcher {
  /**
   * @type {RuntimeMonitor}
   */
  _runtimeMonitorInstance;

  get runtime() {
    return this._runtimeMonitorInstance.runtime;
  }

  // ###########################################################################
  // ctor
  // ###########################################################################

  constructor(_runtimeMonitorInstance) {
    this._runtimeMonitorInstance = _runtimeMonitorInstance;

    // this.patchSetTimeout();
  }

  // // ###########################################################################
  // // setTimeout
  // // ###########################################################################

  // patchSetTimeout() {
  //   monkeyPatchGlobalRaw('setTimeout',
  //     (_ /* global */, [cb, delayMs, ...args], originalSetTimeout, patchedSetTimeout) => {
  //       const bceTrace = peekBCEMatchCallee(patchedSetTimeout);
  //       const schedulerTraceId = bceTrace?.traceId;
  //       if (schedulerTraceId) {
  //         cb = this.patchSetTimeoutCallback(cb, schedulerTraceId);
  //       }

  //       const timer = originalSetTimeout(cb, delayMs, ...args);

  //       if (schedulerTraceId) {
  //         this.runtime.async.preCallback(schedulerTraceId);
  //       }

  //       return timer;
  //     }
  //   );
  // }

  // patchSetTimeoutCallback(cb, schedulerTraceId) {
  //   if (!isFunction(cb)) {
  //     // not a cb
  //     return cb;
  //   }
  //   if (!valueCollection.getRefByValue(cb)) {
  //     // not instrumented
  //     return cb;
  //   }

  //   const originalCb = cb;

  //   const { runtime } = this;

  //   return function patchedPromiseCb(...args) {
  //     let returnValue;
  //     // TODO: peekBCEMatchCallee(patchedCb)
  //     try {
  //       // actually call `then` callback
  //       returnValue = originalCb(...args);
  //     }
  //     finally {
  //       // const cbContext = peekContextCheckCallee(originalCb);
  //       const runId = runtime.getCurrentRunId();
  //       const rootId = runtime.getCurrentVirtualRootContextId();
  //       const context = executionContextCollection.getLastRealContext();

  //       if (context?.contextId === rootId) {
  //         // the CB was called asynchronously
  //         runtime.async.postCallback(schedulerTraceId, runId, rootId);
  //       }
  //     }
  //     return returnValue;
  //   };
  // }


  // ###########################################################################
  // patchCallback
  // ###########################################################################
  patchCallback(arg, schedulerTraceId) {
    const originalCb = arg;

    const { runtime } = this;

    // const self = this; // NOTE: `this` will be the callback's `this`

    return function patchedCallback(...args) {
      let returnValue;
      const lastTraceId = traceCollection.getLast().traceId;
      try {
        // actually call callback
        returnValue = originalCb.call(this, ...args);
      }
      finally {
        // NOTE: there is no BCE, since the callback (in all likelihood) was invoked by the JS runtime
        const context = getFirstContextAfterTrace(lastTraceId);
        if (!context) {
          trace(`Instrumentation failed. No context was created after executing callback "${originalCb.name} (${originalCb})".`);
        }
        else {
          const rootId = runtime.getCurrentVirtualRootContextId();

          // warn(`[patchedCallback] lastTrace=${lastTraceId}, cid=${context.contextId}, rootId=${rootId}, schedulerTraceId=${schedulerTraceId}`);

          if (context.contextId !== rootId) {
            // CB was called synchronously -> we are not interested
          }
          else {
            // the CB was called asynchronously

            // const cbContext = peekContextCheckCallee(originalCb);
            const runId = runtime.getCurrentRunId();
            // const trace = getFirstTraceOfRefValue(callee);
            // const staticTrace = trace && staticTraceCollection.getById(trace.staticTraceId);
            // const traceType = staticTrace?.type;
            // const isInstrumentedFunction = traceType && isFunctionDefinitionTrace(traceType);
            runtime.async.postCallback(schedulerTraceId, runId, rootId);
          }
        }
      }
      return returnValue;
    };
  }

  // ###########################################################################
  // monkeyPatchCallee
  // ###########################################################################

  calleePatcher = (isEventListener, calleeTid, callId, originalFunction) => {
    const self = this; // NOTE: inside `patchedCallee` `this` will be the callee's `this`

    return function patchedCallee(...args) {
      if (this instanceof patchedCallee) {
        // -> `originalFunction` is a ctor
        trace(`patched constructor call (new ${originalFunction.name})`);
      }

      // NOTE: the registered value for callee is `originalFunction`, not `patchedFunction`
      const bceTrace = peekBCEMatchCallee(originalFunction);
      const schedulerTraceId = bceTrace?.traceId;
      let hasInstrumentedCallback = false;
      if (schedulerTraceId) {
        args = args.map(arg => {
          // add an extra layer on instrumented functions
          if (!isInstrumentedFunction(arg)) {
            return arg;
          }
          hasInstrumentedCallback = true;
          return self.patchCallback(arg, schedulerTraceId);
        });
      }

      // console.trace(`calleePatcher ${originalFunction.name}`);
      const result = originalFunction.call(this, ...args);

      if (hasInstrumentedCallback) {
        self.runtime.async.preCallback(schedulerTraceId, isEventListener);
      }

      return result;
    };
  };

  monkeyPatchCallee(originalFunction, calleeTid, callId/* , argTids */) {
    // if (!argTids.length) {
    //   // monkey patching is only necessary for instrumenting callback arguments -> nothing to do
    //   return originalFunction;
    // }
    const bceStaticTrace = getTraceStaticTrace(callId);

    if (isFunction(originalFunction)) {
      if (!bceStaticTrace.data?.isNew && !isClass(originalFunction)) {
        // callee is (probably) function, not es6 ctor

        if (!isInstrumentedFunction(originalFunction)) {
          // NOTE: `@dbux/runtime` calls should not be hit by this

          // not instrumented -> monkey patch it
          let f = getPatchedFunction(originalFunction);
          if (!f) {
            const eventListenerRegex = /^on[A-Z]|event/;
            const isEventListener = !!(originalFunction.name || '').match(eventListenerRegex);
            f = monkeyPatchFunctionOverride(
              originalFunction,
              this.calleePatcher.bind(this, isEventListener, calleeTid, callId)
            );
          }
          return f;
        }
        else {
          // -> uninstrumented function
          // -> ignore
        }
      }
      else {
        // -> es6 class
        // -> ignore
        // future-work: also patch es6 classes?
      }
    }

    return originalFunction;
  }
}
