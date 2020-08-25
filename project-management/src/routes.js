import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import DashBoard from './views/dashboard/dashboard';
import Login from './views/login/login';
import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={withAuthenticated(DashBoard)}></Route>
      <Route path="/" component={withUnAuthenticated(Login)}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
