// usersApi.js
import axios from 'axios';

const API_BASE_URL = 'http://173.254.242.213:3000';

const getUsers = (token) => {
  return axios.get(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = (userId, userData, token) => {
  return axios.patch(`${API_BASE_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updatePasswordUser = (userId, userData, token) => {
  return axios.patch(
    `${API_BASE_URL}/users/update-password/${userId}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteUser = (userId, token) => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createUser = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/signup-internal`, userData);
};

export { getUsers, updateUser, createUser, deleteUser, updatePasswordUser };
