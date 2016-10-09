import React from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'mobx-react';
import routes from '../routes';
class App extends React.Component {
  render() {
    const {context, history} = this.props;
    return (
      <Provider {...context}>
        <Router key={Math.random()} history={browserHistory}>
          {routes()}
        </Router>
      </Provider>
    );
  }
}

export default App;
