import React from 'react';
import {observer} from 'mobx-react';
@observer(['state'])
class Html extends React.Component {
  render() {
    const {state, children} = this.props;
    const devServerURL = !process.env.DEV ?
    '' : `http://${state.app.hostname.replace(2333, 2334)}`;

    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{state.app.title}</title>
          <meta name="title" content={state.app.title}/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
          {process.env.DEV ? null : <link href={'/build/bundle.css'} rel="stylesheet"/>}
          <link rel="icon" href="/favicon.ico"/>
          <script dangerouslySetInnerHTML={insertState(state)}/>
        </head>
        <body>
          <div id="container">
            {children}
          </div>
          <script async src={'/build/bundle.js'}/>
        </body>
      </html>
    );
  }
}

function insertState(state) {
  return {
    __html: `window.__STATE = ${JSON.stringify(state, null, process.env.DEV ? 2 : 0)};`,
  };
}

export default Html;
