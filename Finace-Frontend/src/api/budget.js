import API from './axios';

export const setupBudget = (data) => API.post('/user/budget/setup', data);
export const getMyBudget = () => API.get('/user/budget/me');
export const getDailyStatus = () => API.get('/user/budget/daily');
export const getMonthlyStatus = () => API.get('/user/budget/monthly');
