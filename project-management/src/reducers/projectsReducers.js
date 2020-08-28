import * as projectsActions from '../actions/projectsActions';
import * as userActions from '../actions/userActions';

//Initial state of projects
const INITIAL_STATE = {
  projects: null,
  project: null,
  formMessage: null,
  deleteMessage: null,
};

function projectsReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case projectsActions.SET_PROJECTS:
      return { ...state, projects: action.payload };

    case projectsActions.SET_PROJECT:
      return { ...state, project: action.payload };

    case projectsActions.SET_PROJECT_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case projectsActions.CLEAR_PROJECT_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case projectsActions.SET_PROJECT_DELETE_MESSAGE:
      return { ...state, deleteMessage: action.payload };

    case projectsActions.CLEAR_PROJECT_DELETE_MESSAGE:
      return { ...state, deleteMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default projectsReducers;
