import { getItemById, createNewTask } from '../services/http';
import { fetchProjectById } from './projectsActions';

export const SET_TASK = 'SET_TASK';
export const SET_TASK_FORM_MESSAGE = 'SET_TASK_FORM_MESSAGE';
export const CLEAR_TASK_FORM_MESSAGE = 'CLEAR_TASK_FORM_MESSAGE';

export const setTask = (task) => ({
  type: SET_TASK,
  payload: task,
});

export const setTaskFormMessage = (message) => ({
  type: SET_TASK_FORM_MESSAGE,
  payload: message,
});

export const clearTaskFormMessage = () => ({
  type: CLEAR_TASK_FORM_MESSAGE,
});

export const fetchTaskById = (url) => {
  return (dispatch) => {
    getItemById(url)
      .then((res) => {
        dispatch(setTask(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchNewTask = (url, task) => {
  return (dispatch) => {
    createNewTask(task)
      .then((res) => {
        dispatch(fetchProjectById(url));
        dispatch(clearTaskFormMessage());
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setTaskFormMessage(error));
        } else {
          console.log(err);
        }
      });
  };
};
