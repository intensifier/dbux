import { isDeclarationTrace } from '@dbux/common/src/types/constants/TraceType';
import { astNodeToString, pathToString } from '../helpers/pathHelpers';
import { ZeroNode } from '../instrumentation/builders/buildUtil';
import BaseId from './BaseId';
import BaseNode from './BaseNode';

/**
 * 
 */
export default class BindingIdentifier extends BaseId {
  bindingTrace;

  getTidIdentifier() {
    if (!this.bindingTrace) {
      // NOTE: this can mean its a global (or just plain undeclared)
      // eslint-disable-next-line max-len
      // this.logger.error(new Error(`Tried to "getTidIdentifier" too early for "${this}" in "${this.getParentString()}" - BindingIdentifier.bindingTrace was not recorded yet. getDeclarationNode() = "${this.getDeclarationNode()}" in "${this.getDeclarationNode().getParentString()}"`));
      return ZeroNode;
    }
    return this.bindingTrace.tidIdentifier;
  }

  // getOwnDeclarationNode() {
  //   return this;
  // }

  getBindingScope() {
    let { /* path, */ scope } = this.binding;

    // if (scope.parent) {
    //   // hackfix: just make sure the tid variable is hoisted correctly
    //   // wont-work: because declaration traces might initialize in-place; so we cannot move them
    //   scope = scope.parent;
    //   if (scope.parent) {
    //     scope = scope.parent;
    //   }
    // }

    // /**
    //  * Based on `@babel/traverse/lib/scope/index.js` -> `collectorVisitor`
    //  */
    // if (path.isBlockScoped()) {
    //   let { scope } = path;
    //   if (scope.path === path) scope = scope.parent;
    //   return scope.getBlockParent();
    // }
    // else if (path.isDeclaration() || path.isFunction()) {
    //   // if (path.isBlockScoped()) return;
    //   // if (path.isExportDeclaration()) return;
    //   // const parent = path.scope.getFunctionParent() || path.scope.getProgramParent();
    //   // parent.registerDeclaration(path);
    //   return path.scope.getFunctionParent() || path.scope.getProgramParent();
    // }

    // TODO: Class/FunctionExpressions vs. t.NOT_LOCAL_BINDING?

    // TODO: catch
    // CatchClause(path) {
    //   path.scope.registerBinding("let", path);
    // }
    // return path.scope;
    return scope;
  }

  getDefaultBindingScopeNode() {
    // const scopePath = this.binding.path.scope.path;
    let scopePath = this.getBindingScope().path;
    // if (!scopePath.isFunction() && !scopePath.isProgram()) {
    //   // hackfix: just make sure, the declared variable is not hoisted to nested scope
    //   scopePath = scopePath.parentPath;
    // }

    /**
     * @type {BaseNode}
     */
    const bindingScopeNode = this.getNodeOfPath(scopePath);

    // console.warn(`getDefaultBindingScopeNode(), [${this.path.parentPath.node.type}] ${this.path.toString()}, scope=${scopePath.node.type}`);

    if (!bindingScopeNode?.Traces) {
      throw new Error(`BindingIdentifier's binding scope did not have a valid BaseNode: "${pathToString(scopePath)}" in "${this.getParentString()}"`);
    }
    return bindingScopeNode;
  }

  /**
   * Add declaration trace to scope.
   * Hoisted by default (unless `hoisted` set to false).
   * 
   * Will unshift all `hoisted` declarations as:
   *   `var {declarations.map(traceDeclaration(stid, value))}`
   * Not `hoisted` declarations as:
   *    `te(value, tid)`
   * 
   * @param {NodePath?} definitionPathOrNode Initialization occurs upon declaration. Only used if `hoisted`.
   */
  addOwnDeclarationTrace(definitionPathOrNode = null, moreTraceData = null) {
    // if (this.binding?.path.node.id !== this.path.node) {
    //   // NOTE: should never happen
    //   return;
    // }

    const traceType = moreTraceData?.staticTraceData?.type;
    if (traceType && !isDeclarationTrace(traceType)) {
      this.warn(`staticTraceData.type is not declaration type. You might prefer "addTrace" over "addOwnDeclarationTrace" in this case.`);
    }

    const bindingScopeNode = this.getDefaultBindingScopeNode();

    if (!moreTraceData?.scope) {
      moreTraceData = moreTraceData || {};
      moreTraceData.scope = bindingScopeNode.path.scope;
    }

    // this.warn(`addOwnDeclarationTrace(), [${this.path.parentPath.node.type}] ${this.path.toString()}, ${declarationNode}`);

    return bindingScopeNode.Traces.addDefaultDeclarationTrace(this, definitionPathOrNode, moreTraceData);
  }
}