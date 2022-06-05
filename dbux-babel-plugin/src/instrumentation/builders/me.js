import * as t from '@babel/types';
import template from '@babel/template';
import { buildTraceCall, bindExpressionTemplate } from './templateUtil';
import { getTraceCall, makeInputs, ZeroNode } from './buildUtil';
import { getInstrumentTargetAstNode } from './common';
import { convertNonComputedPropToStringLiteral } from './objects';
import { buildTraceId } from './traceId';
import { buildTraceExpression } from './misc';


// ###########################################################################
// traceExpressionME
// ###########################################################################

/**
 * [ME]
 */

const buildtraceExpressionMEDefault = bindExpressionTemplate(
  '%%tme%%(%%object%%, %%property%%, %%value%%, %%tid%%, %%objectTid%%)',
  function buildtraceExpressionMEDefault(/* meNode, */ state, traceCfg) {
    const meNode = getInstrumentTargetAstNode(state, traceCfg);
    const trace = getTraceCall(state, traceCfg, 'traceExpressionME');
    const tid = buildTraceId(state, traceCfg);

    const {
      object: objectNode,
      property: propertyNode,
      computed
    } = meNode;

    const {
      data: {
        objectTid,
        isObjectTracedAlready,
        objectVar,
        propertyVar, // NOTE: this is `undefined`, if `!computed`
        optional
      }
    } = traceCfg;

    // build object
    const o = isObjectTracedAlready ? objectVar : t.assignmentExpression('=', objectVar, objectNode);

    // build propertyValue
    let propValue = convertNonComputedPropToStringLiteral(propertyNode, computed);
    if (computed) {
      propValue = t.assignmentExpression('=',
        propertyVar,
        propValue
      );
    }

    // build actual MemberExpression
    const newMemberExpression = (optional ? t.optionalMemberExpression : t.memberExpression)(
      objectVar,
      propertyVar || propertyNode,
      computed,
      optional
    );

    return {
      tme: trace,
      object: o,
      property: propValue,
      value: newMemberExpression,
      tid,
      objectTid
    };
  }
);

/**
 * Rval ME.
 */
export function buildtraceExpressionME(state, traceCfg) {
  // const meNode = getInstrumentTargetAstNode(state, traceCfg);
  // if (meNode.optional) {

  // }
  return buildtraceExpressionMEDefault(state, traceCfg);
}


// ###########################################################################
// traceWriteME
// ###########################################################################

/**
 * [ME]
 * 
 * NOTE: argument order enforces order of execution!
 * @example
 * ```js
 * function f(msg, value) { console.log(msg, value); return value; }
 * var o = {};
 * f(1, o)[f(2, 'prop')] = f(3, 'value')
 * o
 * ```
 */
export const buildTraceWriteME = buildTraceCall(
  '%%trace%%(%%object%%, %%objectTid%%, %%propValue%%, %%propTid%%, %%value%%, %%tid%%, %%inputs%%)',
  function buildTraceWriteME(state, traceCfg) {
    const { ids: { aliases: {
      traceWriteME: trace
    } } } = state;
    const tid = buildTraceId(state, traceCfg);

    const assignmentExpression = getInstrumentTargetAstNode(state, traceCfg);
    const {
      left: meAstNode,
      right: rvalAstNode,
      operator
    } = assignmentExpression;

    const {
      property: propertyNode
    } = meAstNode;

    const {
      data: {
        objectTid,
        propTid,
        isObjectTracedAlready,
        propertyVar, // NOTE: this is `undefined`, if `!computed`
        objectVar
      }
    } = traceCfg;

    // build object
    const o = isObjectTracedAlready ? objectVar : buildMEObject(traceCfg.node, traceCfg);

    // build propValue
    let propValue = buildMEProp(traceCfg.node, traceCfg);

    // build lval
    // NOTE: buildMELval does uses `propVar`. We could have also used `propValue`, and then passed `propVar` to trace call.
    const newLvalNode = buildMELval(traceCfg.node, traceCfg, propertyVar || propertyNode);

    // build final assignment
    const newMENode = t.assignmentExpression(
      operator,
      newLvalNode,
      rvalAstNode
    );

    return {
      trace,
      object: o,
      propValue,
      propTid,
      objectTid,
      value: newMENode,
      tid,
      inputs: makeInputs(traceCfg)
    };
  }
);

// ###########################################################################
// buildTraceDeleteME
// ###########################################################################

/**
 * [ME]
 * 
 * @example
 * `delete o.x;`
 * 
 * NOTE: "Private fields can not be deleted"
 */
export const buildTraceDeleteME = buildTraceCall(
  '%%trace%%(%%object%%, %%property%%, %%tid%%, %%objectTid%%, %%inputs%%)',
  function buildTraceDeleteME(state, traceCfg) {
    const { ids: { aliases: {
      traceDeleteME: trace
    } } } = state;
    const tid = buildTraceId(state, traceCfg);

    const unaryExpression = getInstrumentTargetAstNode(state, traceCfg);
    const {
      argument: meNode
    } = unaryExpression;

    const {
      object: objectNode,
      property: propertyNode
    } = meNode;

    const {
      data: {
        objectTid,
        objectVar,
        propertyVar
      }
    } = traceCfg;

    const o = t.assignmentExpression(
      '=',
      objectVar,
      objectNode
    );
    const p = t.assignmentExpression(
      '=',
      propertyVar,
      convertNonComputedPropToStringLiteral(propertyNode, meNode.computed)
    );

    return {
      trace,
      object: o,
      property: p,
      tid,
      objectTid,
      inputs: makeInputs(traceCfg)
    };
  }
);


/** ###########################################################################
 * ME utils
 * ##########################################################################*/

/**
 * @param {BaseNode} meNode 
 * @param {TraceCfg} traceCfg 
 */
export function buildMEObject(meNode, traceCfg) {
  const {
    object: objectNode,
  } = meNode.path.node;

  const {
    data: {
      objectVar
    }
  } = traceCfg;
  return t.assignmentExpression('=', objectVar, objectNode);
}

/**
 * @param {BaseNode} meNode 
 * @param {TraceCfg} traceCfg 
 */
export function buildMEProp(meNode, traceCfg) {
  const {
    property: propertyNode,
    computed
  } = meNode.path.node;
  const {
    data: {
      propertyVar // NOTE: this is `undefined`, if `!computed`
    }
  } = traceCfg;

  let propValue = convertNonComputedPropToStringLiteral(propertyNode, computed);
  if (computed) {
    // store in var because we need `propValue` in multiple places
    propValue = t.assignmentExpression('=',
      propertyVar,
      propValue
    );
  }
  return propValue;
}

export function getMEpropVal(meNode, traceCfg) {
  const {
    property: propertyNode,
    computed
  } = meNode.path.node;
  const {
    data: {
      propertyVar // NOTE: this is `undefined`, if `!computed`
    }
  } = traceCfg;

  return propertyVar || convertNonComputedPropToStringLiteral(propertyNode, computed);
}

/**
 * @param {BaseNode} meNode 
 * @param {TraceCfg} traceCfg 
 */
export function buildMELval(meNode, traceCfg, prop = buildMEProp(meNode, traceCfg)) {
  const {
    computed
  } = meNode.path.node;

  const {
    data: {
      objectVar,
    }
  } = traceCfg;

  return t.memberExpression(
    objectVar,
    prop,
    computed,
    false
  );
}

