import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';
import {defaultState} from './state';
import '../universal/assets/css/style.styl';
import ApolloClient, {createNetworkInterface, addTypename} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import form from './state/form';
import context from './context';
import '../universal/assets/Semantic-UI-CSS/semantic.css';
// import form from '../universal/containers/hello/form';
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    },
    queryTransformer: addTypename,
    transportBatching: true,
    shouldBatch: true,
    initialState: window.__APOLLO_STATE__,
    ssrForceFetchDelay: 3000,
  }),
});
// const state = createClientState();


const container = document.getElementById('container');
render(
  <AppContainer>
    <ApolloProvider client={apolloClient}>
      <App context={context}/>
    </ApolloProvider>
  </AppContainer>, container
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const nextContext = require('./context');
    const NextApp = require('./App');
    render(
      <AppContainer>
        <ApolloProvider client={apolloClient}>
          <NextApp context={nextContext}/>
        </ApolloProvider>
      </AppContainer>
      , container);
  });
}
