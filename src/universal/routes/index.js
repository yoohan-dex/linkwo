import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../containers/AppContainer';
import Hello from '../containers/Hello';
import {NotFound} from '../common/NotFound';
export default () => {
  return (
    <Route path="/" component={App}>
      <Route path="hello" component={Hello}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
};

