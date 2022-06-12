/** @typedef {import('@dbux/common/src/types/DataNode').default} DataNode */
/** @typedef {import('./BaseDDG').default} DataDependencyGraph */

import DataNodeType from '@dbux/common/src/types/constants/DataNodeType';
import { DDGTimelineNode, RefSnapshotTimelineNode } from './DDGTimelineNodes';

/**
 * 
 */
export default class DDGWatchSet {
  // /**
  //  * actual roots in selected set
  //  * @type {Set<number>}
  //  */
  // selectedSetRoots;

  // /**
  //  * all individual DataNodes in all `selectedSetRoot` trees
  //  * @type {Set<number>}
  //  */
  // selectedSet;
  /** @type {number[]} */
  watchTraceIds;
  /** @type {Set<number>} */
  watchTraceIdSet;
  /** @type {Set<number>} */
  watchStaticTraceIdSet;

  /**
   * @type {Set<number>}
   */
  staticTraceIdSet;
  /**
   * @type {Set<number>}
   */
  declarationTids;

  /**
   * @type {Map.<number, RefSnapshotTimelineNode>}
   */
  watchSnapshotsByRef = new Map();

  watchedNodes = new Set();
  addedWatchedDataNodeIds = new Set();
  lastDataNodeByWatchedRefs = new Map();

  /**
   * 
   * @param {DataDependencyGraph} ddg 
   * @param {DataNode[]} inputNodes NOTE: input set is actually a set of trees of DataNodes
   */
  constructor(ddg, watched) {
    this.ddg = ddg;

    const { dp } = this;

    const { watchTraceIds, returnTraceId } = watched;
    this.watchTraceIdSet = new Set(watchTraceIds);
    this.watchTraceIds = Array.from(this.watchTraceIdSet);
    this.returnTraceId = returnTraceId;
    this.returnDataNodeId = dp.util.getDataNodeIdOfTrace(returnTraceId);

    // get all watched declarationTids
    this.staticTraceIdSet = new Set(
      watchTraceIds.
        flatMap(watchTraceId => dp.util.getStaticTraceId(watchTraceId)).
        filter(Boolean)
    );
    this.declarationTids = new Set(
      Array.from(this.staticTraceIdSet).
        flatMap(staticTraceId => {
          const allDeclarationTids = dp.util.getTracesOfStaticTrace(staticTraceId).
            map(trace => {
              return dp.util.getTraceDeclarationTid(trace.traceId);
            });
          // filter(declarationTid => {
          //   if (!declarationTid) {
          //     return false;
          //   }
          //   // TODO: should we ignore `declarationTid`s if not declared in bounds?
          //   const contextId = getContextId(traceId);
          //   return this.bounds.containsContext(contextId);
          // });
          return allDeclarationTids;
        }).
        filter(Boolean)
    );

    // TODO: build ref Snapshots
    // const initialRefIds = makeUnique(
    //   watchTraceIds.
    //     flatMap(watchTraceId => getAllRefIds(watchTraceId)).
    //     filter(Boolean)
    // );

    // TODO: handle non-initial refs (e.g. `a = [[1, 2]]; a[0] = [3, 4]`)
    // this.refIds = initialRefIds
  }

  get dp() {
    return this.ddg.dp;
  }

  get bounds() {
    return this.ddg.bounds;
  }

  #isWatchedSetDataNode(dataNodeId) {
    const dataNode = this.dp.util.getDataNode(dataNodeId);
    return this.watchTraceIdSet.has(dataNode.traceId);
  }

  /**
   * Special purpose trace.
   * If given, it allows for some prettier rendering.
   */
  isReturnDataNode(dataNodeId) {
    return this.returnDataNodeId === dataNodeId;
  }

  /**
   * Whether given dataNode is:
   *   (i) a read of watched set 
   *   (ii) or write to a watched variable or reference.
   * 
   * @return {boolean}
   */
  isWatchedDataNode(dataNodeId) {
    return this.#isWatchedSetDataNode(dataNodeId) ||
      this.isAddedAndWatchedDataNode(dataNodeId);
    // (
    //   // TODO: do we need this?
    //   DataNodeType.is.Write(dataNode.type) &&
    //   this.isWatchedAccessDataNode(dataNodeId)
    // );
  }

  /**
   * Whether given `dataNodeId` is watched, and already has at least one Node
   * registered with it.
   */
  isAddedAndWatchedDataNode(dataNodeId) {
    return this.addedWatchedDataNodeIds.has(dataNodeId);
  }

  /**
   * Whether given dataNode is a read or write on a watched variable or reference.
   * 
   * @return {boolean}
   */
  isWatchedAccessDataNode(dataNodeId) {
    // const dataNode = this.dp.util.getDataNode(dataNodeId);
    const trace = this.dp.util.getTraceOfDataNode(dataNodeId);
    const { staticTraceId } = trace;
    if (this.staticTraceIdSet.has(staticTraceId)) {
      return true;
    }

    const declarationTid = this.dp.util.getDataNodeDeclarationTid(dataNodeId);
    if (this.declarationTids.has(declarationTid)) {
      return true;
    }

    // TODO: watched refs (→ use accessId instead)

    return false;
  }

  /**
   * @param {DDGTimelineNode} node 
   */
  maybeAddWatchedNode(node) {
    if (
      node.dataNodeId &&
      this.isWatchedDataNode(node.dataNodeId) ||
      (node.rootDataNodeId && this.isWatchedDataNode(node.rootDataNodeId))
    ) {
      node.watched = true;
      this.addedWatchedDataNodeIds.add(node.dataNodeId);
      this.watchedNodes.add(node);
      if (node instanceof RefSnapshotTimelineNode) {
        const { refId/* , dataNodeId */, rootDataNodeId } = node;
        this.watchSnapshotsByRef.set(refId, node);
        const lastDataNodeId = rootDataNodeId;
        this.lastDataNodeByWatchedRefs.set(refId, lastDataNodeId);
      }
    }
  }

  // /**
  //  * 
  //  * @param {DataNode} parent 
  //  * @param {DataNode} node 
  //  * @param {Set<DataNode>} visited 
  //  */
  // addSelectedSet(parent, node, visited) {
  //   const { nodeId } = node;
  //   if (visited.has(node)) {
  //     if (parent) {
  //       // remove non-root input nodes
  //       this.selectedSetRoots.delete(nodeId);
  //     }
  //     return;
  //   }
  //   else {
  //     visited.add(node);
  //   }

  //   if (!parent) {
  //     this.selectedSetRoots.add(node.nodeId);
  //   }

  //   // TODO: keep track of path-to-root in `selectedSet`
  //   this.selectedSet.push({ parent: parent.nodeId, to: nodeId });

  //   // make sure to add all children recursively (e.g. in case of array or object)
  //   // TODO-M: find out the actual children to traverse (use algorithm similar to `constructValueFull`)
  //   let children;
  //   const { refId } = node;
  //   if (refId) {
  //     children = this.dp.util.constructVersionedValueSnapshot(refId, nodeId);
  //   }
  //   else {
  //     children = [node];
  //   }
  //   for (const child of children) {
  //     this.addSelectedSet(node, child, visited);
  //   }
  // }

  // /**
  //  * If given `dataNode` refers to a memory location that is in `selectedSet`:
  //  * find its root and produce a unique id combining root id + the id of the path from that root to itself.
  //  */
  // getSelectedSetGroupId(dataNode) {
  //   const root = this.getDataNodeRoot(dataNode);
  //   if (!root) {
  //     return null;
  //   }

  //   const path = this.getDataNodePathToRoot(dataNode);
  //   const rootStaticTraceId = this.dp.util.getStaticTrace(root.traceId);

  //   return `${rootStaticTraceId}#${path})`;
  // }

  // getDataNodePathToRoot(dataNode) {
  //   // TODO-M: use `varAccess.property`?
  // }

  // getDataNodeRoot(dataNode) {
  //   // TODO-M: apply `disjoint set union` data structure?
  // }
}

