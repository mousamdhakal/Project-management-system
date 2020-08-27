import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const createUser = (user) => {
  return axios.post(`${BASE_URL}/users/login`, user, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getThisUser = () => {
  return axios.get(`${BASE_URL}/users/this`);
};
