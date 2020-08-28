import * as uiActions from '../actions/uiActions';
import * as userActions from '../actions/userActions';

// Initial state of UI
const INITIAL_STATE = {
  active: 'dashboard',
  toastMessage: null,
};

function uiReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case uiActions.SET_ACTIVE:
      return { ...state, active: action.payload };

    case uiActions.SET_TOAST:
      return { ...state, toastMessage: action.payload };

    case uiActions.RESET_TOAST:
      return { ...state, toastMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default uiReducers;
