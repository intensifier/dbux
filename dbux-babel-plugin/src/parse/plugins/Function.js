import template from '@babel/template';
import * as t from "@babel/types";
import TraceType from '@dbux/common/src/types/constants/TraceType';
import BasePlugin from './BasePlugin';
import { getNodeNames } from '../../visitors/nameVisitors';
import { doesNodeEndScope } from '../../helpers/astUtil';
import { buildWrapTryFinally, buildBlock } from '../../instrumentation/builders/common';
import { buildContextEndTrace, injectContextEndTrace } from '../../instrumentation/context';
import { buildTraceId } from '../../instrumentation/builders/traceId';
import { buildRegisterParams } from '../../instrumentation/builders/function';
// import { locToString } from '../../helpers/locHelpers';
import { astNodeToString, pathToStringAnnotated } from '../../helpers/pathHelpers';

function addContextTrace(bodyPath, state, type) {
  const { scope } = bodyPath;
  const inProgramStaticTraceId = state.traces.addTrace(
    bodyPath,
    {
      type
    }
  );
  const tidIdentifier = scope.generateUidIdentifier(`t${inProgramStaticTraceId}_`);
  return {
    inProgramStaticTraceId,
    tidIdentifier
  };
}

// ###########################################################################
// builders + templates
// ###########################################################################

// TODO: `isInterruptable` should be in `staticContext`, not dynamically recorded
const pushImmediateTemplate = template(
  'var %%contextIdVar%% = %%pushImmediate%%(%%staticContextId%%, %%inProgramStaticTraceId%%, %%definitionTid%%, %%isInterruptable%%);'
);

// const popFunctionTemplate = template(
//   '%%popFunction%%(%%contextIdVar%%, %%tid%%);'
// );

const pushResumeTemplate = template(
  /*var %%resumeContextId%% =*/
  `%%dbux%%.pushResume(%%resumeStaticContextId%%, %%inProgramStaticTraceId%%);`);

// const popResumeTemplate = template(
//   // `%%dbux%%.popResume(%%resumeContextId%%);`
//   `%%dbux%%.popResume();`
// );


// ###########################################################################
// util
// ###########################################################################

function addResumeContext(bodyPath, state/* , staticId */) {
  const { loc: bodyLoc } = bodyPath.node;

  // the "resume context" starts with the function (function is in "Resumed" state initially)
  const locStart = bodyLoc.start;
  return state.contexts.addResumeContext(bodyPath, locStart);
}

function getLastNodeOfBody(bodyNode) {
  if (!bodyNode) {
    return null;
  }
  const nodes = Array.isArray(bodyNode) ? bodyNode : bodyNode.body;
  return nodes[nodes.length - 1];
}


export default class Function extends BasePlugin {
  static plugins = ['Params'];

  createStaticTraceData(namePath, traceType) {
    const { data: { staticContextId } } = this;
    return {
      type: traceType || TraceType.FunctionDefinition,
      dataNode: {
        isNew: true
      },
      data: {
        name: namePath?.toString(),
        staticContextId
      }
    };
  }

  setFunctionTraceCfg(traceCfg) {
    this.functionTraceCfg = traceCfg;
  }

  get isInterruptable() {
    const { path } = this.node;
    const isGenerator = path.node.generator;
    const isAsync = path.node.async;
    return isGenerator || isAsync;
  }

  get isAsync() {
    const { path } = this.node;
    return path.node.async;
  }

  // ###########################################################################
  // enter
  // ###########################################################################

  enter() {
    // TODO: move `push` and `pop`s to their corresponding correct phases
    const { isInterruptable, node: { path, state } } = this;
    const bodyPath = path.get('body');

    const names = getNodeNames(path.node);
    const {
      name,
      displayName
    } = names;

    const staticContextData = {
      type: 2, // {StaticContextType}
      name,
      displayName,
      isInterruptable
    };

    // this.node.getPlugin('StaticContext')

    /** ########################################
     * TODO: move this whole part to `StaticContext`
     * #######################################*/

    const staticContextId = state.contexts.addStaticContext(path, staticContextData);
    // const pushTraceCfg = addContextTrace(bodyPath, state, TraceType.PushImmediate);

    // TODO: use `const pushTrace = Traces.addTrace` instead
    const staticPushTid = state.traces.addTrace(
      bodyPath,
      {
        type: TraceType.PushImmediate
      }
    );

    const contextPlugin = this.node.getPlugin('StaticContext');
    const contextIdVar = contextPlugin.genContext();


    // staticResumeContextId
    let staticResumeContextId;
    if (isInterruptable) {
      // TODO: also add this to top-level context, if it contains `await`
      staticResumeContextId = addResumeContext(bodyPath, state, staticContextId);
    }

    this.data = {
      contextIdVar,
      staticContextId,
      staticPushTid,
      // pushTraceCfg,
      staticResumeContextId
    };
  }

  exit1() {
    /**
     * NOTE: this must be in `exit1`, because it must happen before `body` exit.
     */
    // const { node, node: { path } } = this;
    // const idPath = path.get('id');
    const { node } = this;
    this.data.paramTraces = node.getPlugin('Params').addParamTraces();
  }

  exit() {
    const { path, Traces } = this.node;

    // NOTE: `finalizeInstrument` will trigger with the final `pop` trace, and then does everything
    // this.data.popTrace = state.traces.addTrace(bodyPath, { type: TraceType.PopImmediate });
    // this.data.popTraceCfg = addContextTrace(bodyPath, state, TraceType.PopImmediate);
    this.data.popTraceCfg = Traces.addTrace({
      path,
      staticTraceData: {
        type: TraceType.PopImmediate
      },
      meta: {
        instrument: this.doInstrument
      }
    });

    // Verbose
    // const { popTraceCfg: pop, staticContextId } = this.data;
    // const { inProgramStaticTraceId } = pop;
    // // const staticTrace = this.node.state.traces.getById(inProgramStaticTraceId);
    // // const { displayName, loc } = staticTrace;
    // const staticContext = this.node.state.contexts.getById(staticContextId);
    // const { displayName, loc } = staticContext;
    // const { filePath } = this.node.peekNodeForce('Program').staticProgramContext;
    // const where = `${filePath}:${locToString(loc)}`;
    // this.node.logger.debug(`[popFunction] #${inProgramStaticTraceId} @${where} "${displayName.replace(/\s+/g, ' ')}"`);
  }


  // ###########################################################################
  // buildPush
  // ###########################################################################

  injectParamsTrace() {
    const { state, path } = this.node;
    const { paramTraces } = this.data;

    const p = buildRegisterParams(state, paramTraces);

    // insert parameter traces at the top
    path.get('body').unshiftContainer("body", p);
  }

  buildPush = () => {
    // TODO: capture closure variables, to get their correct `declarationTid`

    const {
      contextIdVar, staticContextId, staticPushTid, staticResumeContextId
    } = this.data;
    const { state } = this.node;
    const {
      ids: {
        aliases: {
          pushImmediate
        }
      }
    } = state;

    const definitionTid = this.functionTraceCfg.tidIdentifier;

    return [
      pushImmediateTemplate({
        contextIdVar,
        pushImmediate,
        staticContextId: t.numericLiteral(staticContextId),
        inProgramStaticTraceId: t.numericLiteral(staticPushTid),
        definitionTid,
        isInterruptable: t.booleanLiteral(!!staticResumeContextId)
      })
    ];
  }

  // ###########################################################################
  // buildPop
  // ###########################################################################

  buildPop = () => {
    const {
      contextIdVar, popTraceCfg
    } = this.data;
    const { state } = this.node;
    const {
      ids: {
        aliases: {
          popFunction
        }
      }
    } = state;

    const contextPlugin = this.node.getPlugin('StaticContext');

    // NOTE: this is based on `buildTraceStatic`
    // future-work: use `buildTraceStatic` instead
    const { inProgramStaticTraceId } = popTraceCfg;
    const args = [contextIdVar, t.numericLiteral(inProgramStaticTraceId)];
    contextPlugin.addAwaitContextIdVarArg(args);

    return t.expressionStatement(
      t.callExpression(popFunction, args)
    );
  }

  instrument1() {
    // convert lambda expression to block with return statement
    this.node.path.ensureBlock();
    this.injectParamsTrace();
  }

  // ###########################################################################
  // doInstrument
  // ###########################################################################

  /**
   * Instrument all Functions to keep track of all (possibly async) execution stacks.
   * Called as trace.instrument.
   */
  doInstrument = (state /*, traceCfg */) => {
    const {
      isInterruptable,
      node: { path, dontInstrumentContextEnd },
      data: {
        staticPushTid,
        staticResumeContextId,
        contextIdVar,
        popTraceCfg
      }
    } = this;

    // future-work: warn of eval
    //      -> maybe try instrumenting it if it is a simple string?
    //      -> consider bundling `@dbux/babel-plugin` and `@babel/register` with runtime in case of eval?
    const bodyPath = path.get('body');

    // NOTE: `pushImmediate` also records the `trace` for us.

    let pushes = this.buildPush();

    let pops = [
      this.buildPop()
    ];

    /** ########################################
     * ContextEnd
     * #######################################*/

    let bodyNode = bodyPath.node;
    if (!dontInstrumentContextEnd) {
      const lastNode = getLastNodeOfBody(bodyNode);
      if (!lastNode || !doesNodeEndScope(lastNode)) {
        // add ContextEnd trace
        // console.debug(`injecting EndOfContext for: ${bodyPath.toString()}`);
        // path.scope.crawl();
        const contextEndTrace = buildContextEndTrace(path, state);
        if (Array.isArray(bodyNode)) {
          bodyNode.push(contextEndTrace);
        }
        else {
          if (!t.isBlockStatement(bodyNode)) {
            // NOTE: we called `ensureBlock` above
            throw new Error(`Function body is neither array nor block statement: "${pathToStringAnnotated(path, true)}"`);
          }
          bodyPath.pushContainer("body", contextEndTrace);
        }
        // injectContextEndTrace(path, state);
      }
    }

    /** ########################################
     * interruptable functions
     * #######################################*/

    if (isInterruptable) {
      // this is an interruptable function -> push + pop "resume contexts"
      const { ids: { dbux } } = state;
      // const resumeContextId = bodyPath.scope.generateUid('resumeCid');
      pushes = [
        ...pushes,
        pushResumeTemplate({
          dbux,
          // resumeContextId,
          resumeStaticContextId: t.numericLiteral(staticResumeContextId),
          inProgramStaticTraceId: t.numericLiteral(staticPushTid)
        })
      ];

      pops = [
        // popResumeTemplate({
        //   dbux,
        //   // resumeContextId,
        //   // traceId: t.numericLiteral(popTraceCfg.tidIdentifier),
        //   // contextId: contextIdVar
        // }),
        ...pops
      ];
    }

    // wrap the function in a try/finally statement
    const newBody = buildBlock([
      ...pushes,
      // ...recordParams,
      buildWrapTryFinally(bodyNode, pops)
    ]);

    // bodyPath.context.create(bodyNode, bodyNode, 'xx')
    bodyPath.replaceWith(newBody);
  }
}