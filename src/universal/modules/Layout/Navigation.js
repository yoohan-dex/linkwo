import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import {Match, Link} from 'react-router';
import s from './navigation.styl';
import LoginForm from '../../components/LoginForm';
const Test = text => <h2>{text}</h2>;
const activities = pathname => [
  {
    title: 'first',
    routes: [
      {
        to: `${pathname}/template`,
        text: '简历模板',
      }, {
        to: `${pathname}/component`,
        text: '自定义组件',
      }, {
        to: `${pathname}/login`,
        text: '登陆',
      }, {
        to: `${pathname}/profile`,
        text: '关于我',
      }, {
        to: `${pathname}/setting`,
        text: '设置',
      },
    ],
  }, {
    title: 'second',
    routes: [
      {
        pattern: `${pathname}/template`,
        component: Test.bind(null, 'template'),
      }, {
        pattern: `${pathname}/component`,
        component: Test.bind(null, 'cad'),
      }, {
        pattern: `${pathname}/login`,
        component: LoginForm,
      },
    ],
  },
];
// 类似这样的数组
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      stageState: 0,
    };
  }
  handleClick(direction) {
    if (direction === 'fore') {
      return this.navForward;
    } else if (direction === 'back') {
      return this.navBackward;
    }
  }
  @autobind
  navForward() {
    console.log('fore');
    this.setState({stageState: (this.state.stageState - 20)});
  }
  @autobind
  navBackward() {
    console.log('back');
    this.setState({stageState: (this.state.stageState + 20)});
  }
  @autobind
  renderActivity(activity, index) {
    return (
      <Activity
        position={index === 0 ? 'first' : 'after'}
        back={this.navBackward}
        fore={this.navForward}
        title={activity.title}
        routes={activity.routes}
        />
    );
  }

  render() {
    const {pathname} = this.props;
    return (
      <nav className={s.nav}>
        <Stage stageState={this.state.stageState}>
          {activities(pathname).map(this.renderActivity)}
        </Stage>
      </nav>
    );
  }
}

Navigation.propTypes = {

};

export default Navigation;

const Activity = ({children, position, fore, back, title, routes}) => {
  const renderLink = ({to, text}, i) =>
    to ? <li><Link to={to} key={`link-${i}`} onClick={fore}>{text}</Link></li> : null;
  const renderMatch = ({pattern, component}, i) =>
    pattern ? <Match pattern={pattern} key={`match-${i}`} component={component}/> : null;
  const handleClick = () => {
    back();

    setTimeout(() => {
      history.back();
    }, 500);
  };
  return (
    <div className={s.activity}>
      {position === 'first' ?
        <h3 className={s.indicationFirst}>导航栏</h3> :
          <h3 className={s.indication} onClick={handleClick}>返回</h3>
      }
      <hr/>
      <h2 className={s.title}>{title}</h2>
      <navigation>
        <ul>
          {routes.map(renderLink)}
        </ul>
      </navigation>
      {routes.map(renderMatch)}
    </div>
  );
};
const Stage = ({children, stageState}) =>
  <div
    className={s.stage}
    style={{left: `${stageState}%`}}
    >{children}</div>;




