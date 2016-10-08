import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from '../containers/Home';
import {NotFound} from '../common/NotFound';
export default () => {
  return (
    <Route path="/">
      <IndexRoute component={Home}/>
      <Route path="/hell" component={NotFound}/>
    </Route>
  );
};
