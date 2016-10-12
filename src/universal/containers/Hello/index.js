import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import s from './style.scss';
import autobind from 'autobind-decorator';

const query = gql`
  mutation Mutation($name: String!) {
    postAuthor(name: $name)
  }`;

@graphql(query)
@observer(['form'])
export default class Hello extends React.Component {

  render() {
    const {form} = this.props;
    // console.log('getform', form.validate);
    // this.props.mutate({variables: {name: 'yello?'}})
    // .then(({data}) => console.log('got data', data))
    // .catch(err => {console.log('got err', err);});
    return (
      <div>
        <form>
          <input
            type="text"
            name={form.$('email').name}
            value={form.$('email').value}
            placeholder={form.$('email').label}
            onChange={form.$('email').sync}
          />
          <p>{form.$('email').error}</p>
          yes?
          <input
            type="text"
            name={form.$('password').name}
            value={form.$('password').value}
            placeholder={form.$('password').label}
            onChange={form.$('password').sync}
          />
          <p>{form.$('password').error}</p>

          <button type="submit" onClick={form.handleOnSubmit}>Submit</button>
          <button type="button" onClick={form.handleOnReset}>Reset</button>
          <button type="button" onClick={form.handleOnClear}>Clear</button>

          <p>{form.error}</p>
        </form>
      </div>
    );
  }
}
