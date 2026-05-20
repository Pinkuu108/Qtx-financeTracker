import axiosInstance from './axios';

export const registerUser = async (userData) => {
  return await axiosInstance.post('/users/register', userData);
};

export const loginUser = async (credentials) => {
  return await axiosInstance.post('/users/login', credentials);
};

export const logoutUser = async () => {
  return await axiosInstance.post('/users/logout');
};
