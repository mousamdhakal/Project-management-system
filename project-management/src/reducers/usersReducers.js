import * as usersActions from '../actions/usersActions';
import * as userActions from '../actions/userActions';

//Initial state of users
const INITIAL_STATE = {
  users: null,
  formMessage: null,
};

function usersReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case usersActions.SET_USERS:
      return { ...state, users: action.payload };

    case usersActions.SET_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case usersActions.CLEAR_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default usersReducers;
