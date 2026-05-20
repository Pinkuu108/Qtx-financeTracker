import axiosInstance from './axios';

export const sendActivationRequest = async (requestData) => {
  return await axiosInstance.post('/requests/send', requestData);
};

export const getRequestCount = async () => {
  return await axiosInstance.get('/requests/count');
};

export const getAllRequests = async () => {
  return await axiosInstance.get('/requests/all');
};

export const activateRequest = async (id) => {
  return await axiosInstance.put(`/requests/${id}/activate`);
};

export const ignoreRequest = async (id) => {
  return await axiosInstance.put(`/requests/${id}/ignore`);
};
