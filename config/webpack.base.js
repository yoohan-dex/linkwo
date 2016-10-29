import webpack from 'webpack';
import path from 'path';
// import ExtractCSS from 'extract-text-webpack-plugin';
import config from './client';

const root = process.cwd();
const sources = path.join(root, 'src');
const clientInclude = [path.join(root, 'src', 'client'), path.join(root, 'src', 'universal')];
const globalCSS = path.join(root, 'src', 'universal', 'assets', 'Semantic-UI-CSS');

const babelQuery = {
  cacheDirectory: true,
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
  devtool: 'eval-source-map',
  entry: {},
  node: {
    global: true,
    fs: 'empty',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: babelQuery,
      include: sources,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      include: sources,
    }, {
      test: /\.(jpg|png|ttf|svg|woff|woff2|eot?)(\?.+)?$/,
      loader: 'file-loader',
      include: sources,
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?',
      ],
      include: globalCSS,
    }, {
      test: /\.styl$/,
      // loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
      loaders: [
        'style-loader?sourceMap',
        `css-loader?${JSON.stringify({
          sourceMap: true,
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]_[local]_[hash:base64:3]',
          minimize: !true,
        })}`,
        'postcss-loader',
        'stylus-loader',
      ],
      exclude: globalCSS,
      include: clientInclude,
    }],
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, './build'),
  },
  resolve: {
    extensions: ['*', '.js', '.gql', '.styl', '.css'],
    modules: [sources, 'node_modules'],
  },
  plugins: [
    // new HappyPack({
    //   loaders: ['babel'],
    //   threads: 4,
    // }),
    // new webpack.LoaderOptionsPlugin({ // eslint-disable-line
    //   options: {
    //     postcss(bundler) {
    //       return [],
    //   },
    // }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [
            // require('postcss-partial-import')({
            //   prefix: '',
            //   addDependencyTo: bundler,
            //   dirs: [
            //     path.join(__dirname, '../universal/assets/css'),
            //       // path.join(__dirname, '../bower_components'),
            //   ],
            // }),
            // require('postcss-custom-properties')(),
            // require('postcss-custom-media')(),
            // require('postcss-media-minmax')(),
            // require('postcss-custom-selectors')(),
            // require('postcss-calc')(),
            // require('postcss-nesting')(),
            // require('postcss-color-function')(),
            // require('pleeease-filters')(),
            // require('pixrem')(),
            // require('postcss-selector-matches')(),
            // require('postcss-selector-not')(),
            require('autoprefixer')({browsers: config.autoprefixer.browsers}),
            require('postcss-reporter')({
              clearMessages: true,
            }),
          ];
        },
        stylus: {
          use: [require('nib')()],
          import: ['~nib/lib/nib/index.styl'],
          preferPathResolver: 'webpack',
        },
        context: __dirname,
      },
    }),
    // new ExtractCSS({filename: 'bundle.css', allChunks: true}),
  ],
};
