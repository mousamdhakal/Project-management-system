import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import DashBoard from './views/dashboard/dashboard';
import Login from './views/login/login';
import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';
import App from './App';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={withUnAuthenticated(Login)}></Route>
      <App path="/">
        <Switch>
          <Route path="/" component={withAuthenticated(DashBoard)}></Route>
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Routes;
