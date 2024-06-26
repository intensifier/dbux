
/**
 * "body.pipe is not a function"
 * @see https://github.com/node-fetch/node-fetch/issues/930
 */

// node --enable-source-maps --stack-trace-limit=1000 "../../node_modules/@dbux/cli/bin/dbux.js" run --esnext --verbose=1  --pw=.* "./example.js" --

import Project from '../../projectLib/Project';


export default class NodeFetchProject extends Project {
  gitRemote = 'node-fetch/node-fetch.git';
  gitCommit = 'tags/v2.1.2'

  packageManager = 'yarn';

  canRunExercise(config) {
    return !!config.testFilePaths;
  }

  decorateExercise(config) {
    Object.assign(config, {
      dbuxArgs: '--pw=.* --pb=@babel.* --esnext'
    });
    return config;
  }
}