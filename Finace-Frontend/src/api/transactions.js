import axiosInstance from './axios';

export const getTransactions = async () => {
  return await axiosInstance.get('/user/transactions');
};

export const createTransaction = async (transactionData) => {
  return await axiosInstance.post('/user/transactions', transactionData);
};
