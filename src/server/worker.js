import express from 'express';
import logger from 'debug';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import config from '../../config/server';
import context from './middlewares/context';
import render from './middlewares/render';
import isArray from 'lodash/fp/isArray';
import authentication from './middlewares/authentication';
import apollo from './middlewares/apollo';
import devConfig from '../../config/webpack.dev';
const PROD = process.env.NODE_ENV === 'production';
export function run(worker) {
  logger('   >> Worker PID:', process.pid);
  const app = express();
  // const scServer = worker.scServer;
  const httpServer = worker.httpServer;
  httpServer.on('request', app);
  if (!PROD) {
    const compiler = webpack(devConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: devConfig.output.publicPath,
      stats: {
        colors: true,
      },
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }

  if (isArray(config.http.static)) {
    config.http.static.forEach(staticRoute => {
      logger('inferno:static')(staticRoute.path);
      app.use(staticRoute.url, express.static(staticRoute.path));
    });
  }

  app.disable('x-powered-by');
  app.use(bodyParser.json({limit: '2mb'}));
  app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
  app.use(authentication);
  app.use(apollo);
  app.use(context);
  app.use(render);
}

