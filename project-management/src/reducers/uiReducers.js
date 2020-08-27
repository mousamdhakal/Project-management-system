import * as uiActions from '../actions/uiActions';

// Initial state of UI
const INITIAL_STATE = {
  active: 'dashboard',
};

function uiReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case uiActions.SET_ACTIVE:
      return { ...state, active: action.payload };

    default:
      return state;
  }
}

export default uiReducers;
