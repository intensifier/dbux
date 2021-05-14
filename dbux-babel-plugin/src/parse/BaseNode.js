import ParseNode from '../parseLib/ParseNode';
import { makeInputSimple, makeOutputSimple } from '../helpers/inputOutputUtil';


function concatArrays(a, b) {
  if (a && b) {
    return a.concat(b);
  }
  return a || b;
}

/**
 * Custom layer on top of generic ParseNode.
 */
export default class BaseNode extends ParseNode {
  constructor(...args) {
    super(...args);
  }

  getInput(input, inputPath) {
    return input ?
      concatArrays(input.outputs, input.propagatedInputs) :
      makeInputSimple(inputPath);
  }

  getInputs(inputs, inputPaths) {
    return inputs.flatMap((input, i) => this.getInput(input, inputPaths[i]));
  }

  getOutput(output, outputPath) {
    return output ?
      output.outputs :
      makeOutputSimple(outputPath);
  }

  getOutputs(outputs, outputPaths) {
    return outputs.flatMap((output, i) => this.getOutput(output, outputPaths[i]));
  }

  // ###########################################################################
  // static
  // ###########################################################################

  get logger() {
    return this.constructor.logger;
  }
}