import React, {Component, PropTypes} from 'react';
import s from './topbar.styl';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
@CSSModules(s)
class Topbar extends Component {
  render() {
    const {links} = this.props;
    const lists = link =>
      <Link to={link.route}>
        <li>{link.text}</li>
      </Link>;
    return (
      <ul styleName="ul">
        {links.map(lists)}
      </ul>
    );
  }
}

Topbar.propTypes = {

};

export default Topbar;
