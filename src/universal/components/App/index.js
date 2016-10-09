import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div>
        <Link to="/hello">hedllo</Link>
        {this.props.children}
      </div>
    );
  }
}
