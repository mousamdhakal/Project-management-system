import { getAllProjects, createNewProject, getItemById, updateItem, deleteProject } from '../services/http';

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_PROJECT_FORM_MESSAGE = 'SET_PROJECT_FORM_MESSAGE';
export const CLEAR_PROJECT_FORM_MESSAGE = 'CLEAR_PROJECT_FORM_MESSAGE';
export const SET_PROJECT_DELETE_MESSAGE = 'SET_PROJECT_DELETE_MESSAGE';
export const CLEAR_PROJECT_DELETE_MESSAGE = 'CLEAR_PROJECT_DELETE_MESSAGE';

export const setProjectDeleteMessage = (message) => ({
  type: SET_PROJECT_DELETE_MESSAGE,
  payload: message,
});

export const clearProjectDeleteMessage = () => ({
  type: CLEAR_PROJECT_DELETE_MESSAGE,
});

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setProject = (project) => ({
  type: SET_PROJECT,
  payload: project,
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
        dispatch(setProjectFormMessage('Project Created successfully'));
        setTimeout(() => {
          dispatch(clearProjectFormMessage());
        }, 5000);
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setProjectFormMessage(error));
          setTimeout(() => {
            dispatch(clearProjectFormMessage());
          }, 5000);
        } else {
          dispatch(setProjectFormMessage('Error creating the project'));
          setTimeout(() => {
            dispatch(clearProjectFormMessage());
          }, 5000);
        }
      });
  };
};

export const fetchProjectById = (url) => {
  return (dispatch) => {
    getItemById(url)
      .then((res) => {
        dispatch(setProject(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateProjectById = (url, project) => {
  return (dispatch) => {
    updateItem(url, project)
      .then((res) => {
        dispatch(fetchProjectById(url));
        dispatch(setProjectFormMessage('Updated successfully'));
        setTimeout(() => {
          dispatch(clearProjectFormMessage());
        }, 5000);
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setProjectFormMessage(error));
          setTimeout(() => {
            dispatch(clearProjectFormMessage());
          }, 5000);
        } else {
          console.log(err);
        }
      });
  };
};

export const deleteAProject = (id) => {
  return (dispatch) => {
    deleteProject(id)
      .then((res) => {
        dispatch(fetchAllProjects());
        dispatch(setProjectDeleteMessage('Project deleted successfully'));
        setTimeout(() => {
          dispatch(clearProjectDeleteMessage());
        }, 3000);
      })
      .catch((err) => {
        dispatch(setProjectDeleteMessage('Cannot delete project. Check if any task in the project are still existing'));
        setTimeout(() => {
          dispatch(clearProjectDeleteMessage());
        }, 3000);
      });
  };
};
