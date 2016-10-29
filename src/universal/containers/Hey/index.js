import React, {Component} from 'react';
import {Button, Header} from 'semantic-ui-react';
import classnames from 'classnames';
import s from './style.styl';
import CSSModules from 'react-css-modules';
@CSSModules(s, {allowMultiple: true})
export default class Hey extends Component {
  render() {
    const {isExact} = this.props;
    const navStyle = classnames('nav', {'nav-ui': isExact});
    return (
      <div>
        <div styleName={navStyle}>
          <p>{isExact ? 'true' : 'false'}</p>
          <Header>Hey</Header>
        </div>
      </div>
    );
  }
}
