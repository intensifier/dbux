import * as t from "@babel/types";
import TraceType from '@dbux/common/src/types/constants/TraceType';
import { NodePath } from '@babel/traverse';
import BasePlugin from './BasePlugin';
import { getBindingIdentifierPaths } from '../../helpers/bindingsUtil';
import { astNodeToString, pathToString, pathToStringAnnotated } from '../../helpers/pathHelpers';
import BindingIdentifier from '../BindingIdentifier';
import { TraceCfgMeta } from '../../definitions/TraceCfg';
import AssignmentPattern from '../AssignmentPattern';
import { instrumentHoisted } from '../../instrumentation/instrumentMisc';


function getParamDefaultInitializerPath(paramPath) {
  if (paramPath.isAssignmentPattern()) {
    // e.g. returns `3` in `function f(a = 3) {}`
    return paramPath.get('right');
  }
  return null;
}

function isPathSupported(paramPath) {
  // TODO: `{Object,Array}Pattern

  return paramPath.isIdentifier() ||
    // TODO: paramPath.isRestElement() ||
    (paramPath.isAssignmentPattern() && paramPath.get('left').isIdentifier());
}

/**
 * Used to trace function parameters or similarly difficult-to-reach variable declarations.
 */
export default class Params extends BasePlugin {
  get paramsPath() {
    return this.node.path.get('params');
  }

  // enter() {
  //   const { paramsPath } = this;

  //   paramsPath.forEach(paramPath => {
  //     if (!isSupported(paramPath)) {
  //       // TODO: tracing the rhs would introduce new variables whose declaration would be moved into function body,
  //       //      resulting in a TypeError
  //       //    -> skip
  //       //  e.g.: function f({ x } = {}) {}
  //       const init = getParamDefaultInitializerPath(paramPath);
  //       if (init) {
  //         paramPath.get('left').skip();
  //         init.skip();
  //         this.warn(`skipped default initializer "${pathToStringAnnotated(init, true)}"`, !!init.shouldSkip);
  //       }
  //     }
  //   });
  // }

  addParamTraces = () => {
    const { paramsPath } = this;

    // -> `registerParams([traceDeclaration(tid0, p0), traceDeclaration(tid1, p1), ...])`
    return paramsPath.map(paramPath => this.addParamTrace(paramPath));
  }

  exit1() {
    const { paramsPath } = this;
    if (Array.isArray(paramsPath)) {
      for (const paramPath of paramsPath) {
        const paramNode = this.node.getNodeOfPath(paramPath);
        if (paramNode && isPathSupported(paramPath)) {
          paramNode.handler = this;
        }
        // console.debug('PARAM', pathToString(paramPath), paramNode?.debugTag);
      }
    }
  }

  /** 
   * Dynamic {@link TraceCfgMeta#targetNode} function for default initializer (Identifier).
   * 
   * @param {AssignmentPattern} paramNode 
   * @param {NodePath} idPath 
   */
  #makeDefaultTargetNodeId = (paramNode, idPath) => {
    // move (conditional) default value to hoisted parameter declaration
    return t.assignmentExpression('=',
      idPath.node,
      paramNode.buildAndReplaceParam()
    );
  };

  addParamTrace = (paramPath, traceType = TraceType.Param, moreTraceData = null) => {
    const paramNode = this.node.getNodeOfPath(paramPath);
    const defaultInitializerPath = getParamDefaultInitializerPath(paramPath);
    const defaultInitializerNode = defaultInitializerPath && this.node.getNodeOfPath(defaultInitializerPath);

    if (!isPathSupported(paramPath)) {
      this.node.addStaticNoDataPurpose(paramPath, 'UnsupportedParam');
      if (this.node.state.verbose.nyi) {
        this.warn(`[NYI] - unsupported param type: [${paramPath.node?.type}] "${pathToString(paramPath)}" in "${this.node}"`);
      }
      if (defaultInitializerNode) {
        /**
         * NOTE: this case is handled in {@link AssignmentPattern}
         */
      }
      return null;
    }

    // console.warn('addParamTrace', paramPath.isAssignmentPattern(), paramPath.get('left').isIdentifier());

    const idPaths = getBindingIdentifierPaths(paramPath);
    if (idPaths.length !== 1) {
      if (this.node.state.verbose.nyi) {
        this.warn(`[NYI] - param has more or less than 1 variable: "${pathToString(paramPath)}" in "${this.node}"`);
      }
      return null;
    }
    const idPath = idPaths[0];
    /**
     * @type {BindingIdentifier}
     */
    const idNode = this.node.getNodeOfPath(idPath);

    // parameter declaration
    const paramTraceData = {
      path: paramNode.path,
      node: paramNode,
      staticTraceData: {
        type: traceType
      },
      ...moreTraceData
    };

    // ########################################
    // parameter declaration (with defaultInitializer) [v2]
    // ########################################
    let targetNode;  // input for the build function
    if (defaultInitializerNode) {
      /**
       * NOTE: {@link instrumentHoisted} will add the replacement decision expression to the top of the function.
       */
      targetNode = () => {
        const newNode = this.#makeDefaultTargetNodeId(paramNode, idPath);
        // console.log('PARAM default', astNodeToString(newNode));
        return newNode;
      };

      // add default value as input to param trace
      // NOTE: will be overwritten by `ExecutionContextCollection.setParamInputs`, if not default
      paramTraceData.inputTraces = defaultInitializerNode.Traces.addDefaultTraces([
        defaultInitializerPath
      ]);
    }
    else {
      targetNode = idPath.node;
    }

    const declarationOnlyTrace = idNode.addOwnDeclarationTrace(targetNode, paramTraceData);
    return declarationOnlyTrace;
  }
}
