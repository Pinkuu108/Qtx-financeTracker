import API from "../Api";

export const getAllCategories = () => API.get("/categories");
export const addCategory = (data) => API.post("/admin/categories", data);
export const updateCategory = (id, data) => API.put(`/admin/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/admin/categories/${id}`);