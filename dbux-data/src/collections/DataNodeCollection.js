import DataNodeType from '@dbux/common/src/types/constants/DataNodeType';
import SyntaxType from '@dbux/common/src/types/constants/SyntaxType';
import SpecialObjectType from '@dbux/common/src/types/constants/SpecialObjectType';
import TraceType from '@dbux/common/src/types/constants/TraceType';
import DataNode from '@dbux/common/src/types/DataNode';
import EmptyObject from '@dbux/common/src/util/EmptyObject';
import Collection from '../Collection';

/**
 * @extends {Collection<DataNode>}
 */
export default class DataNodeCollection extends Collection {
  constructor(dp) {
    super('dataNodes', dp);
    this.accessUIdMap = new Map();
  }

  /** ###########################################################################
   * collection stuff
   * ##########################################################################*/

  addEntry(dataNode) {
    super.addEntry(dataNode);
    if (dataNode) {
      // set applicationId
      dataNode.applicationId = this.dp.application.applicationId;
    }
  }

  /** ###########################################################################
   * resolve DataNode data
   * ##########################################################################*/

  postIndexProcessed(dataNodes) {
    this.errorWrapMethod('resolveDataNodeType', dataNodes);
    this.errorWrapMethod('resolveDataIds', dataNodes);
    // this.errorWrapMethod('resolveDataNodeSyntax', dataNodes);
  }

  /**
   * For simplicity's sake, the run-time assigns `Read` to all expression result nodes.
   * Here, we set the `Compute` type instead.
   * 
   * @param {DataNode[]} dataNodes 
   */
  resolveDataNodeType(dataNodes) {
    const { dp } = this;
    for (const dataNode of dataNodes) {
      const { nodeId, traceId } = dataNode;
      if (dataNode.type === DataNodeType.Read) {            // is Read
        const trace = dp.util.getTrace(traceId);
        if (trace.nodeId === nodeId) {                      // is owned by its `trace`
          const traceType = dp.util.getTraceType(traceId);
          if (traceType === TraceType.ExpressionResult) {   // is `ExpressionResult`
            dataNode.type = DataNodeType.Compute;
          }
        }
      }
    }
  }

  /**
   * Resolves `accessId` and `valueId` simultaneously.
   * Manually add the index entries (because this is run `postIndex`).
   * @param {DataNode[]} dataNodes 
   */
  resolveDataIds(dataNodes) {
    for (const dataNode of dataNodes) {
      dataNode.accessId = this.getAccessId(dataNode);
      dataNode.valueId = this.lookupValueId(dataNode);
      this.dp.indexes.dataNodes.byAccessId.addEntry(dataNode);
      this.dp.indexes.dataNodes.byValueId.addEntry(dataNode);

      // NOTE: we need syntax look-up to be in order with accessId (due to the "last of accessId" lookup)
      this.resolveDataNodeSyntax(dataNode);
    }
  }

  resolveDataNodeSyntax(dataNode) {
    const ownStaticTrace = this.dp.util.getOwnStaticTraceOfDataNode(dataNode.nodeId);
    if (ownStaticTrace?.syntax) {
      this.SyntaxHandlers[ownStaticTrace.syntax]?.(dataNode, ownStaticTrace);
    }
  }

  /** ###########################################################################
   * syntax interpreter
   * ##########################################################################*/

  syntaxUtil = {
    /**
     * NOTE: we do this currently only for assignment, and not for `UpdateExpression`, because
     * `UpdateExpression` has a legacy solution (using a more convoluted runtime scheme).
     * 
     * @param {DataNode} dataNode 
     * @param {StaticTrace} staticTrace 
     */
    addReadSelfNodeIdToInput: (dataNode, staticTrace) => {
      if (staticTrace.dataNode.isNew && dataNode.accessId) {
        // → this is re-assignment (rather than assignment)

        // get the last dataNode of same accessId (before this one)
        const readSelfNode = this.getSecondButLastDataNodeByAccessId(dataNode.accessId);
        if (readSelfNode) {
          dataNode.inputs.unshift(readSelfNode.nodeId);
        }
      }
    }
  }

  SyntaxHandlers = {
    [SyntaxType.AssignmentLValVar]: this.syntaxUtil.addReadSelfNodeIdToInput,
    [SyntaxType.AssignmentLValME]: this.syntaxUtil.addReadSelfNodeIdToInput
  };


  /** ###########################################################################
   * accessId + valueId
   * ##########################################################################*/


  /** ################################
   * {@link #SpecialObjectTypeHandlers}
   * #################################*/

  SpecialObjectTypeHandlers = {
    /**
     * NOTE: we are not currently using `SpecialIdentifierType.Arguments`
     *    (not `SpecialObjectType.Arguments`).
     */
    [SpecialObjectType.Arguments]: ({ varAccess: { prop } }, contextId) => {
      const callerTrace = this.dp.util.getOwnCallerTraceOfContext(contextId);
      if (callerTrace) {
        const obj = this.dp.util.getCallArgDataNodes(callerTrace.traceId);
        const arg = obj[prop];
        // NOTE: `arg` might not be recorded
        return arg?.valueId || null;
      }

      // NOTE: sometimes, (e.g. in root contexts) we might not have an "own" caller trace
      return null;
    }
  };

  /**
   * @param {DataNode} dataNode 
   */
  getAccessId(dataNode) {
    if (dataNode.accessId > 0) {
      return dataNode.accessId;
    }

    const { varAccess } = dataNode;
    if (!varAccess) {
      return null;
    }
    else {
      let key;
      const { declarationTid, objectNodeId, prop } = varAccess;
      if (declarationTid) {
        key = declarationTid;
      }
      else if (objectNodeId) {
        const objectDataNode = this.dp.collections.dataNodes.getById(objectNodeId);
        const objectValueId = objectDataNode.valueId;
        if (!objectValueId) {
          // sanity check
          const { traceId } = dataNode;
          const traceInfo = this.dp.util.makeTraceInfo(traceId);
          this.logger.warn(`[getAccessId] Cannot find objectValueId of DataNode for trace: ${traceInfo}`);
          return null;
        }
        else {
          key = `${objectValueId}#${prop}`;
        }
      }
      else {
        // sanity check
        const { traceId } = dataNode;
        const traceInfo = this.dp.util.makeTraceInfo(traceId);
        this.logger.warn(`[getAccessId] DataNode has varAccess but neither objectNodeId nor declarationTid for trace: ${traceInfo}`);
        return null;
      }

      if (!this.accessUIdMap.get(key)) {
        this.accessUIdMap.set(key, this.accessUIdMap.size + 1);
      }
      return this.accessUIdMap.get(key);
    }
  }

  /**
   * @param {DataNode} dataNode
   */
  lookupValueId(dataNode) {
    if (dataNode.valueId > 0) {
      return dataNode.valueId;
    }

    if (dataNode.refId) {
      // TODO: fix 
      // TODO: deal with implicitly created ref type objects having a single nodeId for all children
      //      e.g. `JSON.parse('{...}')`
      const firstRef = this.dp.indexes.dataNodes.byRefId.getFirst(dataNode.refId);
      // const firstNodeId = this.dp.util.getAnyFirstNodeIdByRefId(dataNode.refId);
      // return Math.min(firstNodeId, firstRef.nodeId);
      return firstRef.nodeId;
    }
    else {
      const { nodeId, traceId, accessId } = dataNode;
      const { contextId, staticTraceId, nodeId: traceNodeId } = this.dp.collections.traces.getById(traceId);
      const isTraceOwnDataNode = traceNodeId === nodeId;
      const ownStaticTrace = isTraceOwnDataNode && this.dp.collections.staticTraces.getById(staticTraceId);

      const isNewValue = !!ownStaticTrace?.dataNode?.isNew;

      if (!isNewValue) {
        // 1. check for "pass-along"
        if (
          dataNode.inputs?.length === 1
        ) {
          // NOTE: this is a "pass-along" - a Write or other type of non-new value being passed in
          const inputDataNode = this.dp.collections.dataNodes.getById(dataNode.inputs[0]);
          if (!inputDataNode) {
            // sanity check
            const traceInfo = this.dp.util.makeTraceInfo(traceId);
            this.logger.warn(`[lookupValueId] Cannot lookup dataNode.inputs[0] (inputs=${JSON.stringify(dataNode.inputs)}) at trace: ${traceInfo}`);
            return nodeId;
          }

          dataNode.valueFromId = inputDataNode.nodeId;
          return inputDataNode.valueId;
        }

        // 2. if it is not a pass-along, look up accessId.
        //    It is important we do this after (1), since 
        //        looking up by `accessId` won't work on a new Write node.
        if (accessId) {
          const lastNode = this.getLastDataNodeByAccessId(accessId);
          if (lastNode) {
            dataNode.valueFromId = lastNode.nodeId;
            return lastNode.valueId;
          }
        }

        // 3. special value passing semantics (currently non-existing?)
        const { specialObjectType } = this.dp.util.getDataNodeValueRef(dataNode.varAccess?.objectNodeId) || EmptyObject;
        if (specialObjectType) {
          const valueId = this.SpecialObjectTypeHandlers[specialObjectType](dataNode, contextId);
          if (valueId) {
            // NOTE: this will currently never happen
            return valueId;
          }
        }
      }

      // eslint-disable-next-line max-len
      // this.logger.warn(`[lookupValueId] Cannot find valueId for dataNode.\n    trace: ${this.dp.util.makeTraceInfo(traceId)}\n    dataNode: ${JSON.stringify(dataNode)}`);

      return nodeId;
    }
  }

  /** ###########################################################################
   * serialize + utils
   * ##########################################################################*/

  serialize(dataNode) {
    const dataNodeObj = { ...dataNode };
    delete dataNodeObj.applicationId;
    delete dataNodeObj._valueString;
    delete dataNodeObj._valueStringShort;
    return dataNodeObj;
  }

  /**
   * NOTE: When we run this in the `postIndex` phase, 
   *      last in `byAccessId` index is actually "the last before the currently processed node"
   *      since we are resolving the index during this phase.
   * @return {DataNode}
   */
  getLastDataNodeByAccessId(accessId) {
    return this.dp.indexes.dataNodes.byAccessId.getLast(accessId);
  }

  getSecondButLastDataNodeByAccessId(accessId) {
    return this.dp.indexes.dataNodes.byAccessId.getSecondButLast(accessId);
  }

  _reportInvalidId(idx, faultyEntry, recoverable) {
    const { traceId } = faultyEntry || EmptyObject;
    const traceInfo = traceId && this.dp.util.makeTraceInfo(traceId) || '(no trace)';
    this.logger.error(`entry._id !== id (recoverable=${recoverable}) - First invalid entry is at #${idx}: ${traceInfo} ${JSON.stringify(faultyEntry)}`);
  }
}