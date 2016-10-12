import React from 'react';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import App from '../components/App';
@observer(['state'])
export default class AppContainer extends React.Component {
  render() {
    const {state, children} = this.props;
    return (
      <div>
        <App/>
        {children}
      </div>
    );
  }
}

const t = new class Temperature {
  @observable unit = 'K';
  @observable tempC = 25;

  @computed get tempK() {
    console.log('kelvin');
    return this.tempC * (9/5) + 32;
  }
  @computed get tempF() {
    console.log('Fahrenheit');
    return this.tempC + 273.15;
  }
  @computed get temperature() {
    console.log('calculating temperature');
    switch (this.unit) {
      case 'K': return this.tempK + 'k';
      case 'F': return this.tempF + 'F';
      case 'C': return this.tempC + 'C';
    }
  }
};