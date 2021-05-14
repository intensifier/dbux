import Collection from './Collection';


export class DataNodeCollection extends Collection {
  lastRefId = 0;
  objectRefIds = new WeakMap();

  getOrCreateObjectReferenceId(obj) {
    const { objectRefIds } = this;
    let refId = objectRefIds.get(obj);
    if (!refId) {
      objectRefIds.set(obj, refId = ++this.lastRefId);
    }
    return refId;
  }

  makeObjectAccessPath(obj, prop) {
    // TODO: obj is not necessarily reference type
    // TODO: string needs a lot of special treatment (e.g. `s.toString().toString().toString()`)
    return `${this.getObjectReferenceId(obj)}.${prop}`;
  }

  getObjectAccessId(obj, prop, val) {
    if (isReferenceType(val)) {
      return getObjectReferenceId(val);
    }
    else {
      return makeObjectAccessPath(obj, prop);
    }
  }
  // ...

  // TODO: get `lvarBindingId`
  // @param lvarBindingId `traceId` of left-most object variable binding (i.e. traceId of `let o;` for `o.
  /**
   * in:  o.p[q[b].c][d].y.w
   * out: o[meProp(o, [te(q[meProp(q, [te(b, %tid1a%)])], %tid1%), te(d, %tid2%)], [tid1, tid2], %tid0%)]
   *
   * TODO: s.toString().toString().toString()
   */
  meProp(lObj, dynamicArgVals, dynamicArgTraceIds, traceId) {
    const meStaticTrace = getStaticTrace(traceId);
    let { template, dynamicIndexes, isLVal } = meStaticTrace;
    // if (dynamicArgTraceIds.length < dynamicIndexes.length) {
    //   // TODO: OptionalMemberExpression (non-lval only)
    //   dynamicIndexes = dynamicIndexes.slice(0, dynamicArgTraceIds.length);
    // }

    const objectRefs = [getObjectRefId(lObj)];
    let val = lObj;
    let dynamicI = -1;
    for (let i = 1; i < template.length; ++i) {
      if (!val) {
        // TODO: error will usually be thrown here
      }
      let prop = template[i];
      if (!prop) {
        prop = dynamicArgVals[++dynamicI];
      }

      const obj = val;
      val = val[prop];

      objectRefs.push(getObjectAccessId(obj, prop, val));
    }

    // TODO: if commitWrite { ... }

    // TODO: register inputs/outputs
    //  { objectRefs }

    return val;
  }
}