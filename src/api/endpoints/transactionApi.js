import axiosInstance from '../axiosInstance';

export const topUpApi = async (amount) => {
  const response = await axiosInstance.post('/topup', { top_up_amount: amount });
  return response.data;
};


export const paymentTransaction = async (serviceCode) => {
  const response = await axiosInstance.post('/transaction', { service_code: serviceCode });
  return response.data;
};

export const getTransactionHistory = async (offset = 0, limit = 5) => {
  const response = await axiosInstance.get('/transaction/history', {
    params: { offset, limit },
  });
  return response.data;
};
