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

export const createNewTask = (task) => {
  return axios.post(`${BASE_URL}/tasks`, task, {
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

export const getItemById = (url) => {
  return axios.get(`${BASE_URL}${url}`);
};

export const updateProject = (url, project) => {
  return axios.put(`${BASE_URL}${url}`, project, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getThisUser = () => {
  return axios.get(`${BASE_URL}/users/this`);
};
