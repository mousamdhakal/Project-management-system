import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_LOG_IN_MESSAGE = 'SET_LOG_IN_MESSAGE';
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

export const fetchUser = (user, history) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/users/login`, user, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
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
