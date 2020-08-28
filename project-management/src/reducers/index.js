import { combineReducers } from 'redux';

import userReducers from './userReducers';
import usersReducers from './usersReducers';
import uiReducers from './uiReducers';

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
  users: usersReducers,
});

export default reducer;
