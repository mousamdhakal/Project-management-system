import * as commentActions from '../actions/commentActions';
import * as userActions from '../actions/userActions';

//Initial state of comment
const INITIAL_STATE = {
  formMessage: null,
};

function commentReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case commentActions.SET_COMMENT_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case commentActions.CLEAR_COMMENT_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default commentReducers;
