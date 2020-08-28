import { combineReducers } from 'redux';

import userReducers from './userReducers';
import usersReducers from './usersReducers';
import uiReducers from './uiReducers';
import projectsReducers from './projectsReducers';
import taskReducers from './taskReducers';
import commentReducers from './commentReducers';

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  users: usersReducers,
  projects: projectsReducers,
  task: taskReducers,
  comment: commentReducers,
});

export default reducer;
