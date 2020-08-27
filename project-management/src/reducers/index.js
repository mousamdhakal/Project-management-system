import { combineReducers } from 'redux';

import userReducers from './userReducers';
import uiReducers from './uiReducers';

const reducer = combineReducers({
  user: userReducers,
  ui: uiReducers,
});

export default reducer;
