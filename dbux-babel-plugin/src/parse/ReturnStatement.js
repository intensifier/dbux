// import TraceType from '@dbux/common/src/types/constants/TraceType';
import BaseNode from './BaseNode';


export default class ReturnStatement extends BaseNode {
  static children = ['argument'];

  exit() {
    const { path } = this;
    const childPaths = this.getChildPaths();
    const [returnArgPath] = childPaths;

    const func = this.peekPlugin('Function');
    return this.Traces.addReturnTrace(func, this, path, returnArgPath);
  }
}