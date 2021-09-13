import { parseNodeModuleName } from '@dbux/common-node/src/util/pathUtil';
import UserActionType from '@dbux/data/src/pathways/UserActionType';
import AsyncEventUpdateType, { isPostEventUpdate } from '@dbux/common/src/types/constants/AsyncEventUpdateType';
import { makeTreeItem, makeTreeItems } from '../../helpers/treeViewHelpers';
import { ContextTDNode, TraceTypeTDNode } from './traceInfoNodes';
import TraceDetailNode from './traceDetailNode';

/** @typedef {import('@dbux/common/src/types/Trace').default} Trace */



// ###########################################################################
// Debug
// ###########################################################################

function makeObjectArrayNodes(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([name, arr]) => [`${name} (${arr?.length || 0})`, arr || {}])
  );
}

function parseStackTrace(stackTrace) {
  if (!stackTrace) {
    return [];
  }
  if (stackTrace.startsWith('"')) {
    stackTrace = JSON.parse(stackTrace);
  }
  const packages = Array.from(new Set(
    stackTrace.split('\n')
      .filter(s => s.includes('node_modules'))
      .map((s) => {
        // s = s.trim();
        return parseNodeModuleName(s);
      })
      .filter(s => !!s)
  ));

  return {
    packages,
    raw: stackTrace
  };
}

export class DebugTDNode extends TraceDetailNode {
  static makeLabel(/* trace, parent */) {
    return 'Debug';
  }

  get collapseChangeUserActionType() {
    return UserActionType.TDDebugUse;
  }

  init() {
    this.description = `id: ${this.trace.traceId}`;
  }


  mapPostAsyncEvent = (postEventUpdate) => {
    return {
      ...postEventUpdate,
      ...this.dp.util.getPostEventUpdateData(postEventUpdate)
    };
  }

  // makeIconPath(traceDetail) {
  //   return 'string.svg';
  // }

  buildChildren() {
    const { trace, dp } = this;

    const {
      traceId,
      nodeId,
      contextId,
      rootContextId,
      // runId,
      staticTraceId,
      ...otherTraceProps
    } = trace;

    let context = dp.collections.executionContexts.getById(contextId);
    context = {
      ...context,
      stackTrace: parseStackTrace(context.stackTrace)
    };

    const staticTrace = dp.collections.staticTraces.getById(staticTraceId);
    const { staticContextId } = context;
    const staticContext = dp.collections.staticContexts.getById(staticContextId);
    const { programId } = staticContext;
    const staticProgramContext = dp.collections.staticProgramContexts.getById(programId);
    const dataTraceId = dp.util.getValueTrace(traceId)?.traceId || traceId;

    // ###########################################################################
    // valueRef
    // ###########################################################################

    // const refId = dataNode?.refId;
    const valueRef = dp.util.getTraceValueRef(dataTraceId);
    const valueNode = [
      'valueRef',
      valueRef,
      {
        description: `refId=${valueRef?.refId || 0}`
      }
    ];
    // const promiseData = dataProvider.collections.promises.getById(context.promiseId);
    // const promiseNode = [
    //   'promise', 
    //   promiseData,
    //   { 
    //     description: (promiseData?.valueId + '') || 0
    //   }
    // ];

    /** ###########################################################################
     * context
     *  #########################################################################*/

    const contextNode = [`context`, context, { description: `${context?.contextId}` }];

    // ###########################################################################
    // async
    // ###########################################################################

    const asyncNode = dp.indexes.asyncNodes.byRoot.getFirst(rootContextId);
    const asyncEventUpdates = dp.indexes.asyncEventUpdates.byRoot.get(rootContextId);

    // one POST event per `rootId`
    const postEventUpdates = asyncEventUpdates?.filter(({ type }) => isPostEventUpdate(type));
    const postEventUpdateData = postEventUpdates?.map(this.mapPostAsyncEvent);

    // many PRE events per `rootId`
    const otherEventUpdates = asyncEventUpdates?.
      filter(({ type }) => !isPostEventUpdate(type))?.
      map((upd, i) => makeTreeItem(
        `${i}) ${upd.rootId}`,
        upd,
        { description: `${AsyncEventUpdateType.nameFrom(upd.type)} ${upd.schedulerTraceId}` }
      ));

    const asyncContainerNode = [
      'Async',
      {
        AsyncNode: asyncNode,
        PostEventUpdateData: makeTreeItem(
          'PostEventUpdateData',
          postEventUpdateData?.length === 1 ? postEventUpdateData[0] : (postEventUpdateData || {}),
          { description: `${postEventUpdateData?.map(upd => AsyncEventUpdateType.nameFrom(upd.type)) || ''}` }
        ),
        ...makeObjectArrayNodes({
          OtherUpdates: otherEventUpdates
        }),
      },
      {
        // eslint-disable-next-line max-len
        description: `thread=${asyncNode?.threadId}, root=${rootContextId}${postEventUpdateData?.map(upd => ` (${AsyncEventUpdateType.nameFrom(upd.type)})`) || ''}`
      }
    ];


    // ###########################################################################
    // dataNodes
    // ###########################################################################
    const ownDataNodes = dp.indexes.dataNodes.byTrace.get(traceId);
    const dataNodes = dp.util.getDataNodesOfTrace(dataTraceId);

    let dataNode;
    if (nodeId) {
      dataNode = dp.collections.dataNodes.getById(nodeId);
    }
    else {
      dataNode = dataNodes?.[0];
    }

    let dataNodeIndex = dataNodes?.indexOf(dataNode);
    const isInDataNodes = dataNodeIndex >= 0;
    dataNodeIndex = isInDataNodes ? dataNodeIndex : ownDataNodes?.indexOf(dataNode);

    // eslint-disable-next-line no-nested-ternary
    const ownDataNodeContainer = isInDataNodes ? 'dataNodes' : 'ownDataNodes';
    const ownDataNodeLabel = dataNode ? `${ownDataNodeContainer}[${dataNodeIndex}]` : `dataNodes: []`;
    const dataNodeCount = dataNodes?.length || 0;

    const allDataNodes = [];
    !!dataNode && allDataNodes.push([
      ownDataNodeLabel,
      dataNode,
      { description: `nodeId=${dataNode.nodeId}, valueId=${dataNode.valueId}, accessId=${dataNode.accessId}` }
    ]);
    dataNodeCount > 1 && allDataNodes.push([
      `all dataNodes (${dataNodeCount})`,
      dataNodes
    ]);
    ownDataNodes && ownDataNodes !== dataNodes && allDataNodes.push([
      `ownDataNodes (${ownDataNodes.length})`,
      ownDataNodes
    ]);


    // ###########################################################################
    // final result
    // ###########################################################################

    const children = [
      ...this.treeNodeProvider.buildDetailNodes(this.trace, this, [
        TraceTypeTDNode,
        ContextTDNode,
      ]),
      ...makeTreeItems(
        ['trace', otherTraceProps],
        valueNode,
        contextNode,
        asyncContainerNode,
        ...allDataNodes,
        ['staticTrace', staticTrace],
        ['staticContext', staticContext],
        ['staticProgramContext', staticProgramContext],
        // promiseNode
      )
    ];

    return children;
  }
}
