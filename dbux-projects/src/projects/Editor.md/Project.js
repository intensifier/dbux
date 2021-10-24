import Project from '../../projectLib/Project';
import WebpackBuilder from '../../buildTools/WebpackBuilder';

/**
 * Editor.md examples need a bit of extra work:
 * 1. move to from `examples/` to `dbux-examples/`
 * 2. extract all example JS code from *.html to *.js (since we haven't setup `html-loader` yet)
 * 3. make changes to html and js file paths: only refer to files in `examples` via absolute path
 * 
 * future-work: integrate html-loader with dbux-project webpack build process.
 * 
 * @see https://github.com/pandao/editor.md/blob/master/examples/full.html
 */
export default class EditorMdProject extends Project {
  gitRemote = 'pandao/editor.md.git';
  gitCommit = '63786e6';


  makeBuilder() {
    // node node_modules\webpack\bin\webpack.js --watch=false --config ./dbux.webpack.config.js --env port=3244 --env entry="{ \"editormd\": \"src/editormd.js\" }"
    return new WebpackBuilder({
      websitePort: 3844,
      entryPattern: [['src', '*'], 'dbux-examples/*.js'],
      copy: ['examples', 'css', 'lib', 'fonts', 'images', 'languages', 'dbux-examples/*.html']
    });
  }

  loadBugs() {
    // git diff --color=never --ignore-cr-at-eol > ../../dbux-projects/assets/2048/_patches_/error.patch

    return [
      {
        label: 'Full',
        // patch: 'patch1',
        description: 'Basic example of Editor.md',
        runArgs: [],
        /**
         * future-work: use `html-loader` to automatically transform the html file instead
         * @see https://webpack.js.org/loaders/html-loader/
         */
        websitePath: '/dbux-examples/full.html',
        // websitePath: '/examples/full.html'
        // bugLocations: [
        //   {
        //     file: 'src/controller.js',
        //     line: 65
        //   }
        // ]
      }
    ];
  }

  decorateBugForRun(bug) {
    bug.mainEntryPoint = ['src/editormd.js'];
  }

  async testBugCommand(bug, cfg) {
    // nothing to do
  }
}