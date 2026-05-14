import API from "../Api";

export const getAllUsers = () => API.get("/admin/users");
export const getActiveUserCount = () => API.get("/admin/users/active-count");
export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const updateUserStatus = (id, active) =>
  API.put(`/admin/users/${id}/status?active=${active}`);