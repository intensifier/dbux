/** @typedef {import('../RuntimeDataProvider').default} RuntimeDataProvider */

import last from 'lodash/last';
import TraceType, { isTraceReturn } from '@dbux/common/src/types/constants/TraceType';
import { isTraceControlRolePush } from '@dbux/common/src/types/constants/TraceControlRole';
import { newLogger } from '@dbux/common/src/log/logger';
import DataNodeType from '@dbux/common/src/types/constants/DataNodeType';
import { DDGTimelineNode, ContextTimelineNode, PrimitiveTimelineNode } from './DDGTimelineNodes';
import DDGTimelineNodeType from './DDGTimelineNodeType';
import { makeTraceLabel } from '../helpers/makeLabels';

const Verbose = 1;
// const Verbose = 0;


export default class DDGTimelineBuilder {
  /**
   * @type {DDGTimelineNode[]}
   */
  stack;

  /**
   * NOTE: {@link DDGTimelineNode#timelineId} indexes this array.
   * @type {DDGTimelineNode[]}
   */
  timelineNodes = [];

  logger;

  /**
   * @param {import('./DataDependencyGraph').default} ddg
   */
  constructor(ddg) {
    this.ddg = ddg;
    this.logger = newLogger('DDGTimelineControlStack');

    const rootTimelineNode = new DDGTimelineNode(DDGTimelineNodeType.Root);
    this.#addNode(rootTimelineNode);

    /**
     * @type {DDGTimelineNode[]}
     */
    this.stack = [rootTimelineNode];
  }

  get dp() {
    return this.ddg.dp;
  }

  get root() {
    return this.stack[0];
  }

  peek() {
    return last(this.stack);
  }

  /**
   * NOTE: a trace might induce multiple {@link DDGTimelineNode} in these circumstances:
   *   1. if a DataNode reads or writes an object prop, we add the complete snapshot with all its children
   *   2. a Decision node that is also a Write Node (e.g. `if (x = f())`)
   */
  addDataNodes(traceId) {
    const { dp } = this;
    const trace = dp.util.getTrace(traceId);
    const dataNodes = dp.util.getDataNodesOfTrace(traceId);
    const ownDataNode = trace.nodeId && dataNodes.find(dataNode => dataNode.nodeId === trace.nodeId);

    if (!ownDataNode) {
      this.logTrace(`NYI: trace did not have own DataNode: "${dp.util.makeTraceInfo(traceId)}"`);
      return;
    }
    // const trace = dp.util.getTraceOfDataNode(dataNodeId);

    // const dataNodeType = dataNode.type; // TODO!
    const label = this.#makeDataNodeLabel(ownDataNode);

    if (DataNodeType.is.Write(ownDataNode.type) && dp.util.isTraceControlDecision(traceId)) {
      // TODO: add two nodes in this case
    }

    // create node based on DDGTimelineNodeType
    let newNode;
    if (ownDataNode.varAccess?.objectNodeId) {
      const refNodeId = ownDataNode.varAccess.objectNodeId;
      // ref type access → add Snapshot
      if (dataNodes.some(dataNode => dataNode.varAccess?.objectNodeId !== refNodeId)) {
        // sanity checks
        this.logTrace(`NYI: trace has multiple dataNodes accessing different objectNodeIds - "${dp.util.makeTraceInfo(traceId)}"`);
      }
      // TODO: add Snapshot
    }
    else {
      // primitive value or ref assignment
      // ownDataNode.varAccess.declarationTid;
      if (dataNodes.length > 1) {
        this.logTrace(`NYI: trace has multiple dataNodes but no ref type "${dp.util.makeTraceInfo(traceId)}"`);
      }
      newNode = new PrimitiveTimelineNode(dataNode, label);
    }
    newNode.watched = this.ddg.watchSet.isWatchedDataNode(ownDataNode.nodeId);

    this.#addNode(newNode);

    // add to parent
    const parent = this.peek();
    parent.children.push(newNode);
  }

  /**
   * @param {DDGTimelineNode} node 
   */
  #addNode(node) {
    node.timelineId = this.timelineNodes.length;
    this.timelineNodes.push(node);
  }

  #pushGroup(node) {
    this.#addNode(node);
    this.stack.push(node);
  }

  #pop() {
    return this.stack.pop();
  }

  /** ###########################################################################
   * {@link DDGTimelineBuilder#visitTrace}
   * ##########################################################################*/

  visitTrace(traceId) {
    const { dp } = this;
    const trace = dp.util.getTrace(traceId);
    const staticTrace = dp.util.getStaticTrace(traceId);
    if (TraceType.is.PushImmediate(staticTrace.type)) {
      // push context
      this.#pushGroup(new ContextTimelineNode(trace.contextId));
    }
    else if (isTraceControlRolePush(staticTrace.controlRole)) {
      // push branch statement
      // TODO
    }
    else if (dp.util.isTraceControlGroupPop(traceId)) {
      // sanity checks
      if (TraceType.is.PopImmediate(staticTrace.type)) {
        // pop context
        const top = this.peek();
        if (trace.contextId !== top.contextId) {
          this.logTrace(`Invalid pop: expected context=${trace.contextId}, but got: ${top.toString()}`);
          return;
        }
      }
      else {
        // pop branch statement
        // TODO
      }
      this.#pop();
    }
  }

  /** ###########################################################################
   * labels
   * {@link DDGTimelineBuilder##makeDataNodeLabel}
   * ##########################################################################*/

  #makeDataNodeLabel(dataNode) {
    const { dp } = this;
    const { nodeId: dataNodeId, traceId } = dataNode;

    // get trace data
    const { staticTraceId, nodeId: traceNodeId } = this.dp.collections.traces.getById(traceId);
    const isTraceOwnDataNode = traceNodeId === dataNodeId;
    const ownStaticTrace = isTraceOwnDataNode && this.dp.collections.staticTraces.getById(staticTraceId);
    const isNewValue = !!ownStaticTrace?.dataNode?.isNew;

    // variable name
    let label = '';
    if (dataNode.traceId) {
      // NOTE: staticTrace.dataNode.label is used for `Compute` (and some other?) nodes
      label = ownStaticTrace.dataNode?.label;
    }

    if (!label) {
      const varName = dp.util.getDataNodeDeclarationVarName(dataNodeId);
      if (!isNewValue && varName) {
        label = varName;
      }
      else if (isTraceReturn(ownStaticTrace.type)) {
        // return label
        label = 'ret';
      }
    }

    if (!label) {
      if (dp.util.isTraceOwnDataNode(dataNodeId)) {
        // default trace label
        const trace = dp.util.getTrace(dataNode.traceId);
        label = makeTraceLabel(trace);
      }
      else {
        // TODO: ME
      }
    }
    // else {
    // }

    // TODO: nested DataNodes don't have a traceId (or they don't own it)
    return label;
  }
}