import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';
import {Link, Match} from 'react-router';
import s from './styles.styl';
import Layout from '../../modules/Layout';

const query = gql`
  mutation Mutation($name: String!) {
    postAuthor(name: $name)
  }`;
// @graphql(query)
@observer(['form'])
@CSSModules(s)
export default class LoginForm extends React.Component {
  render() {
    const {pathname, isExact, form} = this.props;

    return (
      <div styleName="container">
        <form>
          <fieldset>
            <legend>登陆</legend>
            <input
              type="email"
              name={form.$('email').name}
              value={form.$('email').value}
              placeholder={form.$('email').label}
              onChange={form.$('email').sync}
              />
            <p>{form.$('email').error}</p>
            <input
              type="password"
              name={form.$('password').name}
              value={form.$('password').value}
              placeholder={form.$('password').label}
              onChange={form.$('password').sync}
              />
            <p>{form.$('password').error}</p>

            <button>
              确定
            </button>
            <p>{form.error}</p>
          </fieldset>

        </form>
        <Match pattern={pathname} exactly render={() => null}/>
      </div>
    );
  }
}
