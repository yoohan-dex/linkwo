import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import s from './style.scss';
@observer(['state'])
export default class Hello extends React.Component {
  render() {
    return (
      <div>
        <div className={classnames(s.spinner, s.spinner1)}/>
      </div>
    );
  }
}
