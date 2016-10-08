import express from 'express';
import logger from 'debug';
import bodyParser from 'body-parser';
import config from '../../config/server';
import context from './middlewares/context';
import render from './middlewares/render';
import isArray from 'lodash/fp/isArray';
import authentication from './middlewares/authentication';
import apollo from './middlewares/apollo';

const app = express();

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
app.listen(config.http.port, () => {
  logger('server:start')('Listening on port ' + config.http.port);
});
