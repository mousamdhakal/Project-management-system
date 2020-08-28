import { combineReducers } from 'redux';

import userReducers from './userReducers';
import usersReducers from './usersReducers';
import uiReducers from './uiReducers';
import projectsReducers from './projectsReducers';
import taskReducers from './taskReducers';

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  users: usersReducers,
  projects: projectsReducers,
  task: taskReducers,
});

export default reducer;
