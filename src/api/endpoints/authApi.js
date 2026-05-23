import axiosInstance from '../axiosInstance';

export const loginUserAPI = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  return response.data;
};


export const registerUserAPI = async (data) => {
  const response = await axiosInstance.post('/registration', data);
  return response.data;
};
