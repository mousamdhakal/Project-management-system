import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import withUnAuthenticated from './hoc/withUnAuthenticated';
import withAuthenticated from './hoc/withAuthenticated';
import withRoles from './hoc/withRoles';

import DashBoard from './views/dashboard/dashboard';
import Login from './views/login/login';
import App from './App';
import Projects from './views/projects/projects';
import Tasks from './views/tasks/tasks';
import UsersTable from './views/usersTable/usersTable';
import ProjectsTable from './views/projectstable/projectsTable';
import projectDetails from './views/projectDetails/projectDetails';
import taskDetails from './views/taskDetails/taskDetails';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={withUnAuthenticated(Login)}></Route>
      <App path="/">
        <Switch>
          <Route path="/projects/:id" component={withAuthenticated(projectDetails)}></Route>
          <Route path="/tasks/:id" component={withAuthenticated(taskDetails)}></Route>
          <Route path="/projects" component={withAuthenticated(Projects)}></Route>
          <Route path="/tasks" component={withAuthenticated(Tasks)}></Route>
          <Route path="/userstable" component={withAuthenticated(withRoles(UsersTable, ['admin']))}></Route>
          <Route
            path="/projectstable"
            component={withAuthenticated(withRoles(ProjectsTable, ['admin', 'projectmanager']))}
          ></Route>
          <Route path="/" component={withAuthenticated(DashBoard)}></Route>
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Routes;
