import React from 'react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'mobx-react';

import routes from '../universal/routes';
class App extends React.Component {
  render() {
    const {context, history} = this.props;
    return (
      <Provider {...context}>
        <BrowserRouter>
          {routes()}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
