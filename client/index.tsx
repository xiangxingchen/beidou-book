import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import './theme/stylesheet/index.less';
import { rootStore } from './store';
import { Provider } from 'mobx-react';
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

interface IViewProps {
  asset: (e?: string) => string;
  assetWithHash: (asset: string) => string;
}

interface Html {
  html: {
    title: string;
    desc: string;
    keywords: string;
  };
}

interface InterfaceIC {
  helper: IViewProps;
  title: string;
  html: string;
  state: string;
  asset?: string;
  initState: Html;
}

export default class RouteView extends React.Component<InterfaceIC> {
  private static doctype = '<!DOCTYPE html>';
  private static defaultProps = {
    asset: 'main',
  };

  private static getStore({ initState, userStore }) {
    // return configureStore(initState);
    console.log('userStore', userStore);
    return rootStore(userStore);
  }

  private static getPartial({ store, ctx }) {
    const props = {
      location: undefined,
      context: undefined,
    };
    if (ctx && ctx.url) {
      props.location = ctx.url;
      props.context = {
        location: {
          pathname: ctx.pathname,
        },
      };
    }
    const html = (
      <Provider {...store}>
        <Router {...props}>
          {routes}
        </Router>
      </Provider>
    );

    return { html };
  }

  public render() {
    const { title, html, state, helper, initState } = this.props;
    const indexJs = __DEV__ ? helper.asset('index.js') : helper.assetWithHash('index.js');
    const indexCss = __DEV__ ? helper.asset('index.css') : helper.assetWithHash('index.css');
    return (
      <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content={initState.html.keywords} />
        <meta name="description" content={initState.html.desc} />
        <title>{initState.html.title}</title>
        <script src="/build/static/javascript/flexible.js" />
        <link rel="stylesheet" href="/build/static/icon-font/iconfont.css" />
        <link rel="stylesheet" href={indexCss} />
        <script src="/build/static/icon-font-colorful/iconfont.js"/>
      </head>
      <body>
      <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${state}`,
        }}
      />
      <script src={helper.asset('manifest.js')} />
      <script src={indexJs} />
      </body>
      </html>
    );
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  const store = rootStore(window.__INITIAL_STATE__);
  console.log('__CLIENT__', store);
  const app = (
    <Provider {...store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  );
  ReactDOM.hydrate(app, document.getElementById('container'));
}
