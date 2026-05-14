import API from "../Api";

export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (data) => API.post("/users/register", data);
export const logoutUser = () => API.post("/users/logout");
export const getCurrentUser = () => API.get("/users/me");