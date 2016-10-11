const path = require('path');
const HappyPack = require('happypack');
const ExtractCSS = require('extract-text-webpack-plugin');

const root = process.cwd();
const sources = path.join(root, 'src');
const clientInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal')];
const globalCSS = path.join(root, 'src', 'universal', 'styles', 'global');
const babelQuery = {
  plugins: [
    ['transform-decorators-legacy'],
    ['inline-import'],
    ['react-transform', {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module'],
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react'],
      }],
    }],
  ],
};
export default {
  entry: {},
  node: {
    global: true,
    fs: 'empty',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'happypack/loader',
      query: babelQuery,
      include: sources,
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
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!sass',
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
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, './build'),
  },
  resolve: {
    extensions: ['', '.js', '.gql', 'scss', 'css'],
    modules: [sources, 'node_modules'],
  },
  plugins: [
    new HappyPack({
      loaders: ['babel'],
      threads: 4,
    }),
    // new ExtractCSS({filename: 'bundle.css', allChunks: true}),
  ],
};
