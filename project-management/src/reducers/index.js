import { combineReducers } from 'redux';

import userReducers from './userReducers';

const reducer = combineReducers({
  user: userReducers,
});

export default reducer;
