import React from 'react';
import {Match, Miss} from 'react-router';
import App from '../containers/AppContainer';
import Hello from '../containers/Hello';
import {NotFound} from '../common/NotFound';
export default () => {
  return (
    <main>
      <Match exactly pattern="/" component={App}/>
      <Match pattern="/edit" component={Hello}/>
      <Miss component={NotFound}/>
    </main>
  );
};

