import { getAllUsers, createNewUser, deleteUser } from '../services/http';

export const SET_USERS = 'SET_USERS';
export const SET_USER_FORM_MESSAGE = 'SET_USER_FORM_MESSAGE';
export const CLEAR_USER_FORM_MESSAGE = 'CLEAR_USER_FORM_MESSAGE';
export const SET_USER_DELETE_MESSAGE = 'SET_USER_DELETE_MESSAGE';
export const CLEAR_USER_DELETE_MESSAGE = 'CLEAR_USER_DELETE_MESSAGE';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setUserFormMessage = (message) => ({
  type: SET_USER_FORM_MESSAGE,
  payload: message,
});

export const clearUserFormMessage = () => ({
  type: CLEAR_USER_FORM_MESSAGE,
});

export const setUserDeleteMessage = (message) => ({
  type: SET_USER_DELETE_MESSAGE,
  payload: message,
});

export const clearUserDeleteMessage = () => ({
  type: CLEAR_USER_DELETE_MESSAGE,
});

// Thunk funcitons

export const fetchAllUsers = () => {
  return (dispatch) => {
    getAllUsers()
      .then((res) => {
        dispatch(setUsers(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchNewUser = (user) => {
  return (dispatch) => {
    createNewUser(user)
      .then((res) => {
        dispatch(fetchAllUsers());
        dispatch(setUserFormMessage('User created successfully'));
        setTimeout(() => {
          dispatch(clearUserFormMessage());
        }, 5000);
      })
      .catch((err) => {
        if (err.response) {
          let error = err.response.data.error.details
            ? err.response.data.error.details[0].message
            : err.response.data.error.message;
          dispatch(setUserFormMessage(error));
          setTimeout(() => {
            dispatch(clearUserFormMessage());
          }, 5000);
        } else {
          dispatch(setUserFormMessage('Error creating user'));
          setTimeout(() => {
            dispatch(clearUserFormMessage());
          }, 5000);
        }
      });
  };
};

export const deleteAUser = (id) => {
  return (dispatch) => {
    deleteUser(id)
      .then((res) => {
        dispatch(fetchAllUsers());
        dispatch(setUserDeleteMessage('User deleted successfully'));
        setTimeout(() => {
          dispatch(clearUserDeleteMessage());
        }, 3000);
      })
      .catch((err) => {
        dispatch(
          setUserDeleteMessage('Cannot delete user. Check if user is assigned any task or is managing any projects')
        );
        setTimeout(() => {
          dispatch(clearUserDeleteMessage());
        }, 3000);
      });
  };
};
