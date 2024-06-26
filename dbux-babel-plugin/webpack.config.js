/* eslint no-console: 0 */
const path = require('path');
// const process = require('process');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
// const fromEntries = require('object.fromentries');    // NOTE: Object.fromEntries was only added in Node v12
const {
  makeResolve,
  makeAbsolutePaths
} = require('../dbux-cli/lib/package-util');
const webpackCommon = require('../config/webpack.config.common');

// register self, so we can load dbux src files
require('../scripts/dbux-register-self');
const { pathRelative } = require('../dbux-common-node/src/util/pathUtil');
const { globPatternToEntry } = require('../dbux-common-node/src/util/webpackUtil');

// const _oldLog = console.log; console.log = (...args) => _oldLog(new Error(' ').stack.split('\n')[2], ...args);
const PackageRoot = path.resolve(__dirname);
const PackageFolder = path.basename(__dirname);
// const projectConfig = path.resolve(projectRoot, 'config');
const MonoRoot = path.resolve(__dirname, '..');

const CommonNodeFolder = 'dbux-common-node';


module.exports = (env, argv) => {
  /**
   * NOTE: optimization for some reason renames our `class Function` to `class Function_Function`...
   * But that does not happen when running `echo 'class Function {}' > test.js ; npx terser --mangle --keep-classnames test.js`.
   */
  const ForceNoOptimization = true;
  const outputFolderName = 'dist';
  const mode = argv.mode || 'development';

  const {
    DBUX_VERSION,
    DBUX_ROOT
  } = webpackCommon('dbux-babel-plugin', mode);

  const webpackPlugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
      DBUX_VERSION,
      DBUX_ROOT
    }),
  ];


  const dependencyPaths = [
    'dbux-common',
    CommonNodeFolder
  ];


  const resolve = makeResolve(MonoRoot, dependencyPaths);
  const absoluteDependencies = makeAbsolutePaths(MonoRoot, dependencyPaths);

  // allow resolving `.babelrc` and `babel.config.js`
  resolve.modules.push(PackageRoot);

  // console.log(resolve.modules);
  const rules = [
    // {
    //   loader: 'babel-loader',
    //   include: [
    //     path.join(projectRoot, 'src')
    //   ]
    // },
    {
      loader: 'babel-loader',
      include: absoluteDependencies.map(r => path.join(r, 'src')),
      options: {
        babelrcRoots: absoluteDependencies
      }
    }
  ];

  const entry = {
    [`${PackageFolder}/dist/index`]: path.join(PackageRoot, 'src/index.js'),
    
    // hackfix: also generate some of common-node's stuff (since that does not have its own webpack.config for now)
    ...globPatternToEntry(
      path.join(MonoRoot, CommonNodeFolder, 'src'),
      [['filters', '*.js']],
      (entryKey, fpath/* , parent, entryRoot */) => {
        // entryKey = path.basename(entryKey); // put file directly into dist; don't keep intermediate path
        entryKey = `${CommonNodeFolder}/dist/${entryKey}`;
        return [
          entryKey, fpath
        ];
      }
    ),


  };

  // console.warn('[dbux-babel-plugin] entry:', JSON.stringify(entry, null, 2));

  // eslint-disable-next-line no-nested-ternary
  const optimization = mode !== 'production' ?
    undefined :
    ForceNoOptimization ?
      {
        minimize: false
      } :
      {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              keep_classnames: true
            }
          })
        ]
      };


  return {
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    // https://github.com/webpack/webpack/issues/2145
    mode,
    // devtool: 'inline-module-source-map',
    devtool: 'source-map',
    //devtool: 'inline-source-map',
    target: 'node',
    plugins: webpackPlugins,
    context: path.join(PackageRoot, '.'),
    entry,
    output: {
      // see entry hackfix
      // path: path.join(PackageRoot, outputFolderName),
      path: MonoRoot,
      filename: '[name].js',
      publicPath: outputFolderName,
      libraryTarget: "umd", // probably want commonjs instead
      devtoolModuleFilenameTemplate: "../[resource-path]",
      // sourceMapFilename: outFile + ".map"
    },

    resolve,
    module: {
      rules
    },
    
    optimization,
    // // NOTE: the following generates chunks correctly; however the chunks are not imported in the entries...
    // // "all is not supported on Node in Webpack 4"
    // // It is fixed in 5.0.0-alpha.13.
    // // see: https://github.com/webpack/webpack/issues/9133#issuecomment-493183040
    // optimization: {
    //   splitChunks: {
    //     // NOTE: we are currently not generating any common chunks, because
    //     // chunks: 'all',
    //     // name: false,
    //     cacheGroups: {
    //       common: {
    //         enforceSizeThreshold: 0,
    //         name: 'common-chunks',
    //         minChunks: 2,
    //         chunks: 'async',
    //         priority: 10,
    //         reuseExistingChunk: true,
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    externals: [
      nodeExternals({
        additionalModuleDirs: [
          path.join(MonoRoot, 'node_modules')
        ],
        allowlist: [
          'nanoevents',
          'serialize-javascript',
          'i18next',
          'shelljs',
          /^lodash\/.*/,
          ...Object.keys(resolve.alias).map(name => new RegExp(`^${name}/src/.*`))
        ]
      })
    ],
    node: {
      // generate actual output file information
      // see: https://webpack.js.org/configuration/node/#node__filename
      __dirname: false,
      __filename: false,
    },
    ignoreWarnings: [
      {
        // Ignore warnings due to yarg's dynamic module loading
        module: /node_modules\/yargs/
      }
    ]
  };
};

// console.warn('[dbux-code] webpack config loaded');