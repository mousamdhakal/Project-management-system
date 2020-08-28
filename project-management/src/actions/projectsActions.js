import { getAllProjects, createNewProject } from '../services/http';

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT_FORM_MESSAGE = 'SET_PROJECT_FORM_MESSAGE';
export const CLEAR_PROJECT_FORM_MESSAGE = 'CLEAR_PROJECT_FORM_MESSAGE';

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setProjectFormMessage = (message) => ({
  type: SET_PROJECT_FORM_MESSAGE,
  payload: message,
});

export const clearProjectFormMessage = () => ({
  type: CLEAR_PROJECT_FORM_MESSAGE,
});

// Thunk funcitons

export const fetchAllProjects = () => {
  return (dispatch) => {
    getAllProjects()
      .then((res) => {
        dispatch(setProjects(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchNewProject = (project) => {
  return (dispatch) => {
    createNewProject(project)
      .then((res) => {
        dispatch(fetchAllProjects());
        dispatch(clearProjectFormMessage());
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setProjectFormMessage(error));
        } else {
          console.log(err);
        }
      });
  };
};
