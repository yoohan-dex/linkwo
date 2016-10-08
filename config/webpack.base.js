const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');

const root = process.cwd();
const sources = path.join(root, 'src');
const clientInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal')];
const globalCSS = path.join(root, 'src', 'universal', 'styles', 'global');

export default {
  entry: {},
  node: {
    global: true,
    fs: 'empty',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: sources,
      query: {
        cacheDirectory: true,
        plugins: [],
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      include: sources,
    }, {
      test: /\.(jpg|png|ttf|svg|woff2?)(\?.+)?$/,
      loader: 'file-loader',
      include: path.join(sources, 'assets'),
    }, {
      test: /\.(css|scss)$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
      exclude: globalCSS,
      include: clientInclude,
    }, {
      test: /\.(css|scss)$/,
      loader: ['style', 'css?sourceMap', 'sass?sourceMap'],
      include: globalCSS,
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(root, './build'),
  },
  resolve: {
    extensions: ['', '.js', '.gql', 'scss', 'css'],
    modules: [sources, 'node_modules'],
  },
  plugins: [
    // new ExtractCSS({filename: 'bundle.css', allChunks: true}),
  ],
};
