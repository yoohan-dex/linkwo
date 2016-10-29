import React, {Component, PropTypes} from 'react';
import {Link, Match} from 'react-router';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import {TransitionMotion, spring} from 'react-motion';
import {Header, Container, Content, Text} from 'semantic-ui-react';
import s from './style.styl';
import Topbar from './Topbar';
import Navigation from './Navigation';



@CSSModules(s, {allowMultiple: true})
class Layout extends Component {
  constructor(props) {
    super();
    const {pathname} = props;
  }
  render() {
    const {routes, pathname, isExact} = this.props;
    const mainStyle = classnames('main', {
      'main-to-right': !isExact,
    });
    const links = [
      {
        route: `${pathname}`,
        text: 'CLOSE',
      }, {
        route: `${pathname}`,
        text: 'CLOSE',
      }, {
        route: `${pathname}`,
        text: 'CLOSE',
      }, {
        route: `${pathname}`,
        text: 'CLOSE',
      },
    ];
    return (
      <div>
        <Navigation pathname={`${pathname}/options`}/>
        <main styleName={mainStyle}>
          <div>

            {isExact ? null : <Topbar links={links}/>}
            <article>
              <section>
                <div styleName="resume-page">
                  {isExact ? <Link to={`${pathname}/options`}>OPEN!</Link> : null}
                  <p>this is the resume page!!</p>
                </div>
              </section>
            </article>
          </div>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {

};

const fadeOutStyle = {
  left: spring(-200, {stiffness: 90, damping: 7}),
};

const MatchWithFade = ({component: Component, ...rest}) => {
  const willLeave = () => fadeOutStyle;

  return (
    <Match
      {...rest}
      children={({matched, ...props}) =>
        <TransitionMotion
          willLeave={willLeave}
          styles={matched ? [{
            key: props.location.pathname,
            style: {
              left: 0,
            },
            data: props,
          }] : []}
          >
          {interpolatedStyles => (
            <div>
              {interpolatedStyles.map(config => (
                <div
                  key={config.key}
                  style={{...config.style}}
                  >
                  <Component/>
                </div>
                ))}
            </div>
          )}
        </TransitionMotion>
    }
      />
  );
};

export default Layout;

// <MatchWithFade
//           pattern={`${pathname}/open`}
//           component={Navigation}
//           />
