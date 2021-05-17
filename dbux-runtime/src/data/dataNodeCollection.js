import Trace from '@dbux/common/src/core/data/Trace';
import isObject from 'lodash/isObject';
import Collection from './Collection';
import pools from './pools';
import staticTraceCollection from './staticTraceCollection';
import valueCollection from './valueCollection';


export class DataNodeCollection extends Collection {
  lastRefId = 0;


  /**
   * @param {Trace} trace 
   */
  createDataNodes(value, trace, bindingTid, inputs) {
    // const staticTrace = staticTraceCollection.getStaticTrace(trace.staticTraceId);
    // const { dataNode: staticDataNode } = staticTrace;

    /* const dataNode =  */this.createDataNode(value, trace.traceId, bindingTid, inputs);

    // TODO: resolve deferred access
    // const deferredChildrenTids = getDeferredTids(tid);

    // handleNodeX(value, trace, dataNode, inputs, deferredChildrenTids);
  }

  createDataNode(value, traceId, bindingTid, inputs) {
    const dataNode = pools.dataNodes.allocate();

    dataNode.nodeId = this._all.length;
    dataNode.traceId = traceId;
    this._all.push(dataNode);

    // value
    // NOTE: this currently only registers new objects and primitives
    // TODO: also register object changes
    const valueRef = valueCollection.registerValueMaybe(value, dataNode);
    const varAccess = { refNid: valueRef?.nodeId || 0, varTid: bindingTid };

    dataNode.varAccess = varAccess;
    dataNode.inputs = inputs;

    return dataNode;
  }

  // ###########################################################################
  // util
  // ###########################################################################

  // // TODO: get `lvarBindingId`
  // // @param lvarBindingId `traceId` of left-most object variable binding (i.e. traceId of `let o;` for `o.
  // /**
  //  * in:  o.p[q[b].c][d].y.w
  //  * out: o[meProp(o, [te(q[meProp(q, [te(b, %tid1a%)])], %tid1%), te(d, %tid2%)], [tid1, tid2], %tid0%)]
  //  *
  //  * TODO: s.toString().toString().toString()
  //  */
  // meProp(lObj, dynamicArgVals, dynamicArgTraceIds, traceId) {
  //   const meStaticTrace = getStaticTrace(traceId);
  //   let { template, dynamicIndexes, isLVal } = meStaticTrace;
  //   // if (dynamicArgTraceIds.length < dynamicIndexes.length) {
  //   //   // TODO: OptionalMemberExpression (non-lval only)
  //   //   dynamicIndexes = dynamicIndexes.slice(0, dynamicArgTraceIds.length);
  //   // }

  //   const objectRefs = [getObjectRefId(lObj)];
  //   let val = lObj;
  //   let dynamicI = -1;
  //   for (let i = 1; i < template.length; ++i) {
  //     if (!val) {
  //       // TODO: error will usually be thrown here
  //     }
  //     let prop = template[i];
  //     if (!prop) {
  //       prop = dynamicArgVals[++dynamicI];
  //     }

  //     const obj = val;
  //     val = val[prop];

  //     objectRefs.push(getObjectAccessId(obj, prop, val));
  //   }

  //   // TODO: if commitWrite { ... }

  //   // TODO: register inputs/outputs
  //   //  { objectRefs }

  //   return val;
  // }
}


// ###########################################################################
// export
// ###########################################################################

/**
 * @type {DataNodeCollection}
 */
const dataNodeCollection = new DataNodeCollection();
export default dataNodeCollection;