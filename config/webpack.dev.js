const path = require('path');
const logger = require('debug');
const merge = require('lodash/merge');
const webpack = require('webpack');

const config = require('./webpack.base.js');
merge(config, {
  cache: true,
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      path.join(__dirname, '../src/client/client.js'),
    ],
  },
  output: {
    publicPath: '/build/',
    libraryTarget: 'var',
    pathinfo: true,
  },
});
console.log(path.join(__dirname, '../src/universal/global/libs/index.scss'));
config.module.loaders.forEach(loader => {
  if (loader.loader === 'babel') {
    loader.query.plugins.unshift('react-hot-loader/babel');
  }
});
config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.DEV': true,
      'process.env.BROWSER': true,
      'process.env.BLUEBIRD_WARNINGS': '0',
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
);

// const compiler = webpack(config);
// const port = 2334;

export default config;
// new WebpackDevServer(compiler, {
//   publicPath: config.output.publicPath,
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap',
//   },
//   hot: true,
//   historyApiFallback: true,
//   stats: {
//     colors: true,
//     hash: false,
//     timings: false,
//     version: false,
//     chunks: false,
//     modules: false,
//     children: false,
//     chunkModules: false,
//   },
// }).listen(port, 'localhost', err => {
//   if (err) {
//     return logger('webpack:error', err);
//   }
//   logger('webpack:compiler')('Running on port ' + port);
// });
