import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';

import Users from './pages/list/user';
import UI from './pages/ui/ui';

// const Users = Loadable({
//   loader: () => import('./pages/list/user'),
//   loading: () => <div>loading</div>,
// });

export default (
  <Switch>
    <Route exact path="/" component={Users} />
    <Route exact path="/ui" component={UI} />
  </Switch>
);
