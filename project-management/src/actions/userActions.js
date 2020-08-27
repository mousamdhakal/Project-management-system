import setAuthorizationToken from '../utils/setAuthorizationToken';
import { createUser, getThisUser } from '../services/http';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_LOG_IN_MESSAGE = 'SET_LOG_IN_MESSAGE';
export const CLEAR_LOG_IN_MESSAGE = 'CLEAR_LOG_IN_MESSAGE';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setLogInMessage = (message) => ({
  type: SET_LOG_IN_MESSAGE,
  payload: message,
});

export const clearLogInMessage = () => ({
  type: CLEAR_LOG_IN_MESSAGE,
});

// Thunk functions

export const fetchUser = (user, history) => {
  return (dispatch) => {
    createUser(user)
      .then((res) => {
        dispatch(setAuthenticated());
        dispatch(clearLogInMessage());
        localStorage.setItem('jwtToken', res.data.token);
        setAuthorizationToken(res.data.token);
        history.push('/dashboard');
      })
      .catch((err) => {
        if (err.response) {
          dispatch(setLogInMessage(err.response.data.error.message));
        } else {
          console.log(err);
        }
      });
  };
};

export const getUserData = (history) => {
  return (dispatch) => {
    // dispatch(removeUser());
    getThisUser()
      .then((res) => {
        // console.log(res.data.data);
        dispatch(setUser(res.data.data));
      })
      .catch((err) => {
        //  If the token has expired logout and clear user data
        console.log('login again');
        dispatch(setLogInMessage('Token expired. Please login Again'));
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(removeUser());
        history.push('/login');
      });
  };
};
