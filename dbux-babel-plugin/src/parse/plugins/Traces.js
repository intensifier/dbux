// import { NodePath } from '@babel/traverse';
// import DataNodeType from '@dbux/common/src/core/constants/DataNodeType';
// import TraceType from '@dbux/common/src/core/constants/TraceType';
// import EmptyArray from '@dbux/common/src/util/EmptyArray';
import TraceType, { isDeclarationTrace } from '@dbux/common/src/core/constants/TraceType';
import NestedError from '@dbux/common/src/NestedError';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import TraceCfg from '../../definitions/TraceCfg';
import { pathToString } from '../../helpers/pathHelpers';
import { instrumentExpression, traceDeclarations } from '../../instrumentation/instrumentMisc';
// import { pathToString } from '../../helpers/pathHelpers';
import BasePlugin from './BasePlugin';

const makeDefaultTrace = {
  // Literal(path) {
  // }
};

export default class Traces extends BasePlugin {
  /**
   * Special declaration traces that will be hoisted to scope of this.node.
   */
  hoistedDeclarationTraces = [];

  /**
   * Traces that will be instrumented in order.
   */
  traces = [];

  // ###########################################################################
  // trace inputs
  // ###########################################################################

  addDefaultTrace = (path) => {
    const node = this.node.getNodeOfPath(path);
    if (!node) {
      // handle some (basic) default AST node types
      const traceData = makeDefaultTrace[path.node.type]?.(path);
      if (!traceData) {
        this.node.logger.warn(`Could not addDefaultTrace for unknown AST node type "${path.node.type}", path: ${pathToString(path)}`);
        return null;
      }
      return this.addTrace(traceData);
    }
    else {
      return node.addDefaultTrace();
    }
  }

  /**
   * NOTE: we assume inputs to be RVals.
   */
  addDefaultTraces(inputPaths) {
    return inputPaths.flat()
      .map(this.addDefaultTrace)
      .filter(node => !!node);
  }

  // ###########################################################################
  // addTrace
  // ###########################################################################

  /**
   * @return {TraceCfg}
   */
  addTrace(traceData) {
    if (Array.isArray(traceData)) {
      for (const t of traceData) {
        this.addTrace(t);
      }
      return null;
    }


    const {
      path,
      node,
      scope,
      staticTraceData,
      inputTraces,
      meta,
      data
    } = traceData;

    if (!path || !staticTraceData) {
      throw new Error(`addTrace data missing \`path\` or \`staticTraceData\`: ${JSON.stringify(traceData)}`);
    }

    const isDeclaration = isDeclarationTrace(staticTraceData.type);

    // set default static DataNode
    staticTraceData.dataNode = staticTraceData.dataNode || { isNew: false };

    const { state } = this.node;
    const inProgramStaticTraceId = state.traces.addTrace(path, staticTraceData);

    // NOTE: `scope.push` happens during `instrument`
    const tidIdentifier = (scope || path.scope).generateUidIdentifier(`t${inProgramStaticTraceId}_`);

    const traceCfg = {
      path,
      node,
      scope,
      staticTraceData,
      inProgramStaticTraceId,
      tidIdentifier,
      isDeclaration,
      inputTraces,
      meta,
      data
    };

    if (isDeclaration) {
      const declarationNode = node.getOwnDeclarationNode();
      if (!declarationNode) {
        throw new Error(`Assertion failed - node.getDeclarationNode() returned nothing ` +
          `for Declaration "${node}" in "${node.getParentString()}`);
      }
      if (declarationNode.bindingTrace) {
        // NOTE: this happens if parameter has same name as hoisted `var` local.
        const msg = `Tried to add declaration trace multiple times for "${declarationNode}" in "${declarationNode.getParentString()}"`;
        this.warn(msg);
        // throw new Error(msg);
      }
      else {
        declarationNode.bindingTrace = traceCfg;
      }

      if (meta?.hoisted) {
        this.hoistedDeclarationTraces.push(traceCfg);
      }
      else {
        this.traces.push(traceCfg);
      }

      // eslint-disable-next-line max-len
      this.Verbose && this.debug(`DECL "${declarationNode}" in "${declarationNode.getParentString()}" by "${node}" in "${node.getParentString()}" (${traceCfg.tidIdentifier.name})`);
    }
    else {
      this.traces.push(traceCfg);
    }

    if (node && !node._traceCfg) {
      node._setTraceCfg(traceCfg);
    }

    this.Verbose >= 2 && this.debug('[addTrace]', tidIdentifier.name, `([${inputTraces?.map(tid => tid.name).join(',') || ''}])`, `@"${this.node}"`);

    return traceCfg;
  }

  // ###########################################################################
  // addDefaultDeclarationTrace
  // ###########################################################################

  /**
   * @param {BindingIdentifier} id
   */
  addDefaultDeclarationTrace(id, valuePathOrNode, moreTraceData = null) {
    moreTraceData = moreTraceData || {};
    moreTraceData.staticTraceData = moreTraceData.staticTraceData || {
      type: TraceType.Declaration,
      dataNode: {
        // NOTE: Most declarations are hoisted to some scope, always assigned a "new" value (`undefined`, if `valueNode` not given)
        //      Notable exception: `param`.
        isNew: true
      }
    };

    const traceData = {
      path: id.path,
      node: id,
      ...moreTraceData
    };
    return this.addDeclarationTrace(traceData, valuePathOrNode);
  }

  addDeclarationTrace(traceData, valuePathOrNode) {
    if (valuePathOrNode) {
      // `data.valueNode`
      traceData.data = traceData.data || {};
      traceData.data.valueNode = valuePathOrNode.node || valuePathOrNode;
    }
    
    // `meta.hoisted`
    traceData.meta = traceData.meta || {};
    if (!('hoisted' in traceData.meta)) {
      traceData.meta.hoisted = true;
    }

    const traceCfg = this.addTrace(traceData);

    return traceCfg;
  }

  // ###########################################################################
  // addReturnTrace, addThrowTrace
  // ###########################################################################

  addReturnTrace(node, path, argPath) {
    const hasArgument = !!argPath.node;

    const traceData = {
      node,
      path,
      staticTraceData: {
        type: hasArgument ? TraceType.ReturnArgument : TraceType.ReturnNoArgument,
      },
      meta: {
        traceCall: 'traceReturn',
        targetPath: argPath
      }
    };

    return this.addTraceWithInputs(traceData, hasArgument && [argPath] || EmptyArray);
  }

  // ###########################################################################
  // addTraceWithInputs
  // ###########################################################################

  addTraceWithInputs(traceData, inputPaths) {
    // add trace for inputTraces if they don't have any yet
    // NOTE: especially for `Literal` or `ReferencedIdentifier`
    traceData.inputTraces = this.addDefaultTraces(inputPaths);

    return this.addTrace(traceData);
  }

  // exit() {
  // }

  // ###########################################################################
  // instrument
  // ###########################################################################

  instrumentHoistedTraceDeclarations = (traceCfgs) => {
    const { node } = this;
    const { state } = node;

    if (traceCfgs.length) {
      traceDeclarations(node.path, state, traceCfgs);
    }
  }

  instrument() {
    const { node, traces, hoistedDeclarationTraces } = this;

    // this.debug(`traces`, traces.map(t => t.tidIdentifier));
    this.instrumentHoistedTraceDeclarations(hoistedDeclarationTraces);

    for (const traceCfg of traces) {
      // add variable to scope
      const {
        /* inProgramStaticTraceId, */
        path,
        tidIdentifier,
        scope,
        staticTraceData: { type: traceType },
        meta: {
          preInstrument,
          instrument = instrumentExpression
        } = EmptyObject
      } = traceCfg;
      (scope || path.scope).push({
        id: tidIdentifier
      });

      // instrument?.(traceCfg);
      const { state } = node;

      try {
        preInstrument?.(state, traceCfg);
        instrument?.(state, traceCfg);
        this.Verbose > 1 && this.debug(` ins [${TraceType.nameFromForce(traceType)}] -> ${pathToString(path)}`);
      }
      catch (err) {
        throw new NestedError(`[${node.debugTag}] - failed to instrument path "${pathToString(path)}"`, err);
      }
    }
  }
}