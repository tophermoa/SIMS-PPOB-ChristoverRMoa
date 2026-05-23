import axiosInstance from '../axiosInstance';

export const getServices = async () => {
  const response = await axiosInstance.get('/services');
  return response.data;
};

export const getBanners = async () => {
  const response = await axiosInstance.get('/banner');
  return response.data;
};
