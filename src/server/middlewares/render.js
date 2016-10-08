import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext, browserHistory} from 'react-router';
import {Provider} from 'mobx-react';
// import fetchData from '../../shared/fetchData';
import Html from '../../universal/common/Html';
import routes from '../../universal/routes';
/**
 * Server-side render
 * @param req
 * @param res
 */
export default function render(req, res) {
    // Create routing
  const matchRoutes = {
    routes: routes(req.context),
    location: req.originalUrl,
  };
  function sendResponse(statusCode, content) {
    res.status(statusCode).send('<!DOCTYPE html>\n' + content);
  }

  function renderComponent(renderProps) {
    return (
      <Provider history={browserHistory} {...req.context}>
        <Html>
          <RouterContext {...renderProps}/>
        </Html>
      </Provider>
    );
  }

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
}
