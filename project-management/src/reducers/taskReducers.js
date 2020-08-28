import * as taskActions from '../actions/taskActions';
import * as userActions from '../actions/userActions';

//Initial state of tasks
const INITIAL_STATE = {
  task: null,
  formMessage: null,
};

function taskReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case taskActions.SET_TASK:
      return { ...state, task: action.payload };

    case taskActions.SET_TASK_FORM_MESSAGE:
      return { ...state, formMessage: action.payload };

    case taskActions.CLEAR_TASK_FORM_MESSAGE:
      return { ...state, formMessage: null };

    case userActions.REMOVE_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export default taskReducers;
