import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import Loadable from 'react-loadable';
import { hot } from 'react-hot-loader';

import Users from './pages/list/user';
import UI from './pages/ui/ui';

// const Users = Loadable({
//   loader: () => import('./pages/list/user'),
//   loading: () => <div>loading</div>,
// });
// const hotComponent = (com) => hot(module)(com);

export default (
  <div>
  <Switch>
    <Route exact path="/" component={Users} />
    <Route exact path="/ui" component={UI} />
  </Switch>
  <DevTools />
  </div>
);
