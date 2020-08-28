import * as projectsActions from '../actions/projectsActions';
import * as userActions from '../actions/userActions';

//Initial state of projects
const INITIAL_STATE = {
  projects: null,
  formMessage: null,
};

function projectsReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case projectsActions.SET_PROJECTS:
      return { ...state, projects: action.payload };

    case projectsActions.SET_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case projectsActions.CLEAR_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default projectsReducers;
