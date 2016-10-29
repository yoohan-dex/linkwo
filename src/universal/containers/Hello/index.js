import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';
import {Link, Match} from 'react-router';
import {Button, Header} from 'semantic-ui-react';
import s from './style.styl';
import Hey from '../Hey';
import Sidebar from '../../modules/Sidebar';

const query = gql`
  mutation Mutation($name: String!) {
    postAuthor(name: $name)
  }`;
@graphql(query)
@observer(['form'])
@CSSModules(s)
export default class Hello extends React.Component {
  constructor() {
    super();
    this.state = {
      sideBarState: false,
    };
    this.handleSidebar = this.handleSidebar.bind(this);
  }
  handleSidebar() {
    console.log('have change!');
    this.setState({
      sideBarState: !this.state.sideBarState,
    }, console.log('have change!'));
  }
  render() {
    const {pathname, isExact} = this.props;

    return (
      <div styleName="container">
        <Sidebar pathname={pathname} isExact={isExact}/>
      </div>
    );
  }
}
