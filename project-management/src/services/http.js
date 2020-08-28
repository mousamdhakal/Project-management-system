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

export const createNewComment = (comment) => {
  return axios.post(`${BASE_URL}/comments`, comment, {
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

export const updateItem = (url, item) => {
  return axios.put(`${BASE_URL}${url}`, item, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/users/${id}`);
};

export const deleteProject = (id) => {
  return axios.delete(`${BASE_URL}/projects/${id}`);
};

export const deleteTask = (id) => {
  return axios.delete(`${BASE_URL}/tasks/${id}`);
};

// export const updateTask = (url, task) => {
//   return axios.put(`${BASE_URL}${url}`, task, {
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };

// export const updateComment = (url, commetn) => {
//   return axios.put(`${BASE_URL}${url}`, comment, {
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };

export const getThisUser = () => {
  return axios.get(`${BASE_URL}/users/this`);
};
