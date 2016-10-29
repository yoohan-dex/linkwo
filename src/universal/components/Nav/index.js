import React from 'react';
import {Link} from 'react-router';
import s from './style.styl';
class Nav extends React.Component {
  render() {
    return (
      <div>
        <nav className={s.nav}>
          <a href="#">LinkWo</a>
          <ol>
            <li><Link to="/edit">EDIT</Link></li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default Nav;
