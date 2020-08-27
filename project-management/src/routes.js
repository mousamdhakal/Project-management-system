import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';

import DashBoard from './views/dashboard/dashboard';
import Login from './views/login/login';
import App from './App';
import Projects from './views/projects/projects';
import Tasks from './views/tasks/tasks';
import Comments from './views/comments/comments';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={withUnAuthenticated(Login)}></Route>
      <App path="/">
        <Switch>
          <Route path="/projects" component={withAuthenticated(Projects)}></Route>
          <Route path="/tasks" component={withAuthenticated(Tasks)}></Route>
          <Route path="/comments" component={withAuthenticated(Comments)}></Route>
          <Route path="/" component={withAuthenticated(DashBoard)}></Route>
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Routes;
