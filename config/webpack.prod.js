const path = require('path');
const logger = require('debug');
const merge = require('lodash/merge');
const webpack = require('webpack');
const config = require('./webpack.base.js');

merge(config, {
  cache: false,
  target: 'web',
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, '../src/client/client.js'),
  },
  output: {
    publicPath: 'http://localhost:2333/build/',
    libraryTarget: 'var',
  },
});

logger('server:webpack')('Environment: Production');

delete config.output.libraryTarget;
delete config.output.pathinfo;
config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  })
);

config.plugins.push(
new webpack.DefinePlugin({
  'process.env.BROWSER': true,
  'process.env.BLUEBIRD_WARNINGS': '0',
  'process.env.NODE_ENV': JSON.stringify('production'),
}));

if (config.devtool === 'eval') {
  throw new Error('Using "eval" source-map my break the build');
}

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) throw err;

    // Output stats
  console.log(stats.toString({
    colors: true,
    hash: false,
    chunks: false,
    version: false,
    chunkModules: false,
  }));

  if (stats.hasErrors()) {
    logger('server:webpackError')(stats.compilation.errors.toString());
  }
  logger('webpack:compiler')('Finished compiling');
});

