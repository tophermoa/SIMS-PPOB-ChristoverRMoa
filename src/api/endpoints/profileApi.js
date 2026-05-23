import axiosInstance from '../axiosInstance';

export const getProfileAPI = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

export const updateProfileAPI = async (data) => {
  const response = await axiosInstance.put('/profile/update', data);
  return response.data;
};


export const updateProfileImageAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.put('/profile/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
