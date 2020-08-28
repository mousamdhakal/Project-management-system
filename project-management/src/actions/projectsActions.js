// import { getAllUsers, createNewUser } from '../services/http';

import { getAllProjects } from '../services/http';

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_FORM_MESSAGE = 'SET_FORM_MESSAGE';
export const CLEAR_FORM_MESSAGE = 'CLEAR_FORM_MESSAGE';

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setFormMessage = (message) => ({
  type: SET_FORM_MESSAGE,
  payload: message,
});

export const clearFormMessage = () => ({
  type: CLEAR_FORM_MESSAGE,
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

// export const fetchNewUser = (user) => {
//   return (dispatch) => {
//     createNewUser(user)
//       .then((res) => {
//         dispatch(fetchAllUsers());
//       })
//       .catch((err) => {
//         if (err.response) {
//           let error = err.response.data.error.details
//             ? err.response.data.error.details[0].message
//             : err.response.data.error.message;
//           dispatch(setFormMessage(error));
//         } else {
//           console.log(err);
//         }
//       });
//   };
// };
