import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from '../universal/common/App';
import {createClientState} from './state';
import '../universal/styles/global/index.scss';

const state = createClientState();
const context = {
  state,
};

const container = document.getElementById('container');
render(
  <AppContainer>
    <App context={context}/>
  </AppContainer>, container
);

if (module.hot) {
  module.hot.accept('../universal/common/App', () => {
    const NextApp = require('../universal/common/App');
    render(
      <AppContainer>
        <NextApp context={context}/>
      </AppContainer>
      , container);
  });
}
