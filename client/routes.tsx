import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
// import Users from './pages/list/user';
import Css from './pages/css';

const Users = Loadable({
  loader: () => import('./pages/list/user'),
  loading: () => <div>loading</div>,
});


export default (
  <Switch>
    <Route exact path="/css" component={Css} />
    <Route exact path="/user" component={Users} />
  </Switch>
);
