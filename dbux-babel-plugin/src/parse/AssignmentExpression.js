import BaseExpression from './BaseExpression';

/**
 * 
 */
export default class AssignmentExpression extends BaseExpression {
  static children = ['left', 'right'];
  static plugins = [];

  // exit() {
  //   // const [left, right] = this.getChildNodes();
  //   // TODO: add destructuring pattern support
  //   // TODO: all types of `operator` (+=, -=, ||= etc.)
  //   return {
  //     inputs: [this.getInput(right, rightPath)],
  //     outputs: [this.getOutput(left, leftPath)]
  //   };
  // }
}