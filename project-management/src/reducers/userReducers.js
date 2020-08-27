import * as userActions from '../actions/userActions';

let token = localStorage.getItem('jwtToken');

//Initial state of user
const INITIAL_STATE = {
  user: null,
  isAuthenticated: token ? true : false,
  loginMessage: null,
};

function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.SET_USER:
      return { ...state, user: action.payload, isAuthenticated: true };

    case userActions.REMOVE_USER:
      return { ...state, user: null, isAuthenticated: false };

    case userActions.SET_LOG_IN_MESSAGE:
      return { ...state, loginMessage: action.payload };

    case userActions.CLEAR_LOG_IN_MESSAGE:
      return { ...state, loginMessage: null };

    case userActions.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };

    default:
      return state;
  }
}

export default userReducers;
