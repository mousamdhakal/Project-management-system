import * as usersActions from '../actions/usersActions';
import * as userActions from '../actions/userActions';

//Initial state of users
const INITIAL_STATE = {
  users: null,
  formMessage: null,
  deleteMessage: null,
};

function usersReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case usersActions.SET_USERS:
      return { ...state, users: action.payload };

    case usersActions.SET_USER_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case usersActions.CLEAR_USER_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case usersActions.SET_USER_DELETE_MESSAGE:
      return { ...state, deleteMessage: action.payload };

    case usersActions.CLEAR_USER_DELETE_MESSAGE:
      return { ...state, deleteMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default usersReducers;
