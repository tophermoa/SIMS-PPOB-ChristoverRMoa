import axiosInstance from '../axiosInstance';

export const getBalanceAPI = async () => {
  const response = await axiosInstance.get('/balance');
  return response.data;
};
