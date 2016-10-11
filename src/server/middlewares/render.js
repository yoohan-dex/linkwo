import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext, browserHistory} from 'react-router';
import {Provider} from 'mobx-react';
// import fetchData from '../../shared/fetchData';
import Html from '../../universal/common/Html';

const PROD = process.env.NODE_ENV === 'production';

export default function render(req, res) {
    // Create routing
  // const matchRoutes = {
  //   routes: routes(req.context),
  //   location: req.originalUrl,
  // };
  const routes = PROD ? require('../../universal/routes') : null;
  function sendResponse(statusCode, content) {
    res.status(statusCode).send('<!DOCTYPE html>\n' + content);
  }

  function renderComponent(renderProps) {
    return (
      <Provider history={browserHistory} {...req.context}>
        <Html>
          {PROD ? <RouterContext {...renderProps}/> : null}
        </Html>
      </Provider>
    );
  }
  if (PROD) {
    const matchRoutes = {
      routes: routes(req.context),
      location: req.originalUrl,
    };

    match(matchRoutes, (error, redirectLocation, renderProps) => {
      if (error) return res.status(500).send(error.message);
      if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput);
      if (!renderProps) return res.status(404).send('Not found');

      // fetchData(renderProps, req.context).then(() => {
      sendResponse(200, ReactDOMServer.renderToStaticMarkup(renderComponent(renderProps)));
    //   }).catch(error => {
    //     sendResponse(404, error);
    //   });
    });
  } else {
    sendResponse(200, ReactDOMServer.renderToStaticMarkup(renderComponent()));
  }
}
