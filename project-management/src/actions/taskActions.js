import { getItemById, createNewTask, updateItem } from '../services/http';
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
        dispatch(setTaskFormMessage('Task create successfully'));
        setTimeout(() => {
          dispatch(clearTaskFormMessage());
        }, 5000);
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setTaskFormMessage(error));
          setTimeout(() => {
            dispatch(clearTaskFormMessage());
          }, 5000);
        } else {
          dispatch(setTaskFormMessage('Error creating the task'));
          setTimeout(() => {
            dispatch(clearTaskFormMessage());
          }, 5000);
        }
      });
  };
};

export const updateTaskById = (url, task) => {
  return (dispatch) => {
    updateItem(url, task)
      .then((res) => {
        dispatch(fetchTaskById(url));
        dispatch(setTaskFormMessage('Updated successfully'));
        setTimeout(() => {
          dispatch(clearTaskFormMessage());
        }, 5000);
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setTaskFormMessage(error));
          setTimeout(() => {
            dispatch(clearTaskFormMessage());
          }, 5000);
        } else {
          console.log(err);
        }
      });
  };
};
