import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const createUser = (user) => {
  return axios.post(`${BASE_URL}/users/login`, user, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const createNewUser = (user) => {
  return axios.post(`${BASE_URL}/users`, user, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const createNewProject = (project) => {
  return axios.post(`${BASE_URL}/projects`, project, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const getAllProjects = () => {
  return axios.get(`${BASE_URL}/projects/all`);
};

export const getThisUser = () => {
  return axios.get(`${BASE_URL}/users/this`);
};
