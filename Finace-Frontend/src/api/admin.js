import axiosInstance from './axios';

export const getUsers = async () => {
  return await axiosInstance.get('/admin/users');
};

export const getActiveUserCount = async () => {
  return await axiosInstance.get('/admin/users/active-count');
};

export const updateUser = async (id, userData) => {
  return await axiosInstance.put(`/admin/users/${id}`, userData);
};

export const updateUserStatus = async (id, active) => {
  return await axiosInstance.put(`/admin/users/${id}/status?active=${active}`);
};

export const deleteUser = async (id) => {
  return await axiosInstance.delete(`/admin/users/${id}`);
};

export const createCategory = async (categoryData) => {
  return await axiosInstance.post('/admin/categories', categoryData);
};

export const updateCategory = async (id, categoryData) => {
  return await axiosInstance.put(`/admin/categories/${id}`, categoryData);
};

export const deleteCategory = async (id) => {
  return await axiosInstance.delete(`/admin/categories/${id}`);
};
