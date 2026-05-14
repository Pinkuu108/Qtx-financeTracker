import API from "../Api";

export const saveTransaction = (data) => API.post("/user/transactions", data);
export const getTransactions = (userId) => API.get(`/user/transactions/${userId}`);