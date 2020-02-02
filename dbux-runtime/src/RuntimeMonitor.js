import { logInternalError } from 'dbux-common/src/log/logger';
import ExecutionContextType from 'dbux-common/src/core/constants/ExecutionContextType';
import TraceType from 'dbux-common/src/core/constants/TraceType';
import staticProgramContextCollection from './data/staticProgramContextCollection';
import executionContextCollection from './data/executionContextCollection';
import staticContextCollection from './data/staticContextCollection';
import traceCollection from './data/traceCollection';
import staticTraceCollection from './data/staticTraceCollection';
import Runtime from './Runtime';
import ProgramMonitor from './ProgramMonitor';

/**
 * 
 */
export default class RuntimeMonitor {
  static _instance;
  /**
   * Singleton
   * @type {RuntimeMonitor}
   */
  static get instance() {
    return this._instance || (this._instance = new RuntimeMonitor());
  }

  _programMonitors = new Map();
  _runtime = new Runtime();


  // ###########################################################################
  // Program management
  // ###########################################################################

  // getContext(contextId) {
  //   return this._contexts;
  // }

  /**
   * @returns {ProgramMonitor}
   */
  addProgram(programData) {
    const staticProgramContext = staticProgramContextCollection.addProgram(programData);
    const { programId } = staticProgramContext;
    const { staticContexts, traces } = programData;
    staticContextCollection.addContexts(programId, staticContexts);

    // change program-local _staticContextId to globally unique staticContextId
    for (let i = 1; i < traces.length; ++i) {
      const trace = traces[i];
      let staticContext = staticContexts[trace._staticContextId];
      if (!staticContext?.staticId) {
        // set to random default, to avoid more errors down the line?
        staticContext = staticContexts[1];
        logInternalError('trace had invalid `_staticContextId`', trace);
      }
      delete trace._staticContextId;
      trace.staticContextId = staticContext.staticId;
    }
    staticTraceCollection.addTraces(programId, traces);

    const programMonitor = new ProgramMonitor(this, staticProgramContext);
    this._programMonitors.set(programId, programMonitor);

    return programMonitor;
  }



  // ###########################################################################
  // public interface
  // ###########################################################################

  /**
   * Very similar to `pushCallback`
   */
  pushImmediate(programId, inProgramStaticId, traceId) {
    this._runtime.beforePush(null);

    const parentContextId = this._runtime.peekCurrentContextId();
    const stackDepth = this._runtime.getStackDepth();
    const context = executionContextCollection.executeImmediate(
      stackDepth, programId, inProgramStaticId, parentContextId
    );
    const { contextId } = context;
    this._runtime.push(contextId);

    // trace
    traceCollection.trace(contextId, traceId);

    // const staticContext = staticContextCollection.getContext(programId, inProgramStaticId);
    // const { isInterruptable } = staticContext;
    // if (isInterruptable) {
    //   // start with a resume context
    //   this.pushResume(inProgramStaticId, null, traceId);
    // }

    return contextId;
  }


  popImmediate(contextId, traceId) {
    // sanity checks
    const context = executionContextCollection.getById(contextId);
    if (!context) {
      logInternalError('Tried to popImmediate, but context was not registered:', contextId);
      return;
    }

    // pop from stack
    this._pop(contextId);

    // trace
    traceCollection.trace(contextId, traceId);
  }

  _pop(contextId) {
    // executionContextCollection.setContextPopped(contextId);
    this._runtime.pop(contextId);
  }


  // ###########################################################################
  // Schedule callbacks
  // ###########################################################################

  /**
   * Push a new context for a scheduled callback for later execution.
   */
  scheduleCallback(programId, inProgramStaticId, schedulerId, traceId, cb) {
    // this._runtime.beforePush(schedulerId);
    const parentContextId = this._runtime.peekCurrentContextId();
    // TODO: parentContextId + schedulerId are the same?
    // TODO: for dynamically detected `scheduleCallback` contexts, the callback does not have its own staticId
    // TODO: Option 1 - don't create a StaticContext for ScheduleCallback in general, and use traces for that instead?
    // TODO: Option 2 - be able to create a dynamic `ExecutionContext` from `staticTrace` (instead of `staticContext`)? (i.e. potentially merge bookkeeping of the two concepts?)
    const stackDepth = this._runtime.getStackDepth();

    const scheduledContext = executionContextCollection.scheduleCallback(stackDepth,
      programId, inProgramStaticId, parentContextId, schedulerId);
    const { contextId: scheduledContextId } = scheduledContext;
    const wrapper = this.makeCallbackWrapper(scheduledContextId, traceId, cb);

    // this._runtime.push(scheduledContextId);
    this._runtime.scheduleCallback(scheduledContextId);

    // trace
    traceCollection.trace(scheduledContextId, traceId, TraceType.ScheduleCallback);

    return wrapper;
  }

  makeCallbackWrapper(scheduledContextId, inProgramTraceId, cb) {
    return (...args) => {
      /**
       * We need this so we can always make sure we can link things back to the scheduler,
       * even if the callback declaration is not inline.
       */
      const callbackContextId = this.pushCallback(scheduledContextId, inProgramTraceId);

      try {
        return cb(...args);
      }
      finally {
        this.popCallback(callbackContextId, inProgramTraceId);
      }
    };
  }

  /**
   * Very similar to `pushImmediate`.
   * We need it to establish the link with it's scheduling context.
   */
  pushCallback(scheduledContextId, inProgramTraceId) {
    this._runtime.beforePush(scheduledContextId);

    const parentContextId = this._runtime.peekCurrentContextId();
    const stackDepth = this._runtime.getStackDepth();
    // let stackDepth = this._runtime._executingStack.indexOf(scheduledContextId);

    // register context
    const context = executionContextCollection.executeCallback(
      stackDepth, scheduledContextId, parentContextId
    );
    const { contextId } = context;
    this._runtime.push(contextId);

    // log event
    traceCollection.trace(scheduledContextId, inProgramTraceId, TraceType.PushCallback);

    return contextId;
  }

  popCallback(callbackContextId, inProgramTraceId) {
    // sanity checks
    const context = executionContextCollection.getById(callbackContextId);
    if (!context) {
      logInternalError('Tried to popCallback, but context was not registered:',
        callbackContextId);
      return;
    }

    // pop from stack
    this._pop(callbackContextId);

    // trace
    traceCollection.trace(callbackContextId, inProgramTraceId, TraceType.PopCallback);
  }


  // ###########################################################################
  // Interrupts, await et al
  // ###########################################################################

  preAwait(programId, inProgramStaticId, traceId) {
    // pop resume context
    this.popResume();

    // push await context
    this._runtime.beforePush(null);
    const parentContextId = this._runtime.peekCurrentContextId();
    const stackDepth = this._runtime.getStackDepth();
    const context = executionContextCollection.await(
      stackDepth, programId, inProgramStaticId, parentContextId
    );
    const { contextId: awaitContextId } = context;
    this._runtime.push(awaitContextId);
    this._runtime.registerAwait(awaitContextId);  // let run-time now that this is gonna be "waiting"

    // trace
    traceCollection.trace(awaitContextId, traceId);

    return awaitContextId;
  }

  wrapAwait(programId, awaitContextId, awaitValue) {
    // nothing to do...
    return awaitValue;
  }

  /**
   * Resume given stack
   */
  postAwait(awaitResult, awaitContextId, resumeTraceId) {
    // sanity checks
    const context = executionContextCollection.getById(awaitContextId);
    if (!context) {
      logInternalError('Tried to postAwait, but context was not registered:', awaitContextId);
      return;
    }

    // bring back stack of awaiting context
    this._runtime.resumeWaitingStack(awaitContextId);

    // pop from stack
    this._pop(awaitContextId);

    // resume: insert new [Resume] context and add as resumedChild
    const { staticContextId } = context;
    const staticContext = staticContextCollection.getById(staticContextId);
    const { resumeId: resumeStaticContextId } = staticContext;
    this.pushResume(resumeStaticContextId, awaitContextId, resumeTraceId);

    return awaitResult;
  }

  /**
   * The `schedulerId` of a `resume` can be two things:
   * (1) the function itself (when pushing the initial "resume context" on function call)
   * (2) an await context (when resuming after an await)
   */
  pushResume(resumeStaticContextId, schedulerId, resumeTraceId, dontTrace = false) {
    const parentContextId = this._runtime.peekCurrentContextId();
    const stackDepth = this._runtime.getStackDepth();
    const resumeContext = executionContextCollection.resume(
      parentContextId, resumeStaticContextId, schedulerId, stackDepth
    );

    const {
      contextId: resumeContextId
    } = resumeContext;
    this._runtime.push(resumeContextId);

    if (!dontTrace) { // NOTE: We don't want to trace when pushing the default Resume context of an interruptable function
      // trace
      traceCollection.trace(resumeContextId, resumeTraceId, TraceType.Resume);
    }
  }

  popResume() {
    const resumeContextId = this._runtime.peekCurrentContextId();

    // sanity checks
    const context = executionContextCollection.getById(resumeContextId);
    if (!context) {
      logInternalError('Tried to popResume, but context was not registered:', resumeContextId);
      return;
    }
    if (context.contextType !== ExecutionContextType.Resume) {
      logInternalError('Tried to popResume, but stack top is not of type `Resume`:', context);
      return;
    }

    this._pop(resumeContextId);
  }

  // ###########################################################################
  // traces
  // ###########################################################################

  trace(programId, inProgramStaticTraceId) {
    const contextId = this._runtime.peekCurrentContextId();
    traceCollection.trace(contextId, inProgramStaticTraceId);
  }

  traceExpression(programId, inProgramStaticTraceId, value) {
    const contextId = this._runtime.peekCurrentContextId();
    traceCollection.traceExpressionResult(contextId, inProgramStaticTraceId, value);
    return value;
  }

  traceArg(programId, inProgramStaticTraceId, value) {
    const contextId = this._runtime.peekCurrentContextId();
    if (value instanceof Function) {
      // scheduled callback
      const context = executionContextCollection.getById(contextId);
      const { staticContextId } = context;
      const staticContext = staticContextCollection.getById(staticContextId);
      const { _staticId: inProgramStaticId } = staticContext;
      
      const schedulerId = contextId;
      const cb = value;
      return this.scheduleCallback(programId, inProgramStaticId, schedulerId, inProgramStaticTraceId, cb);
    }
    else {
      // just a normal expression
      return this.traceExpression(programId, inProgramStaticTraceId, value);
    }
  }
}