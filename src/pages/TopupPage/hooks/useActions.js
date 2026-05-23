import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { topUpApi } from '../../../api/endpoints/transactionApi';
import { getBalanceAPI } from '../../../api/endpoints/balanceApi';
import { setBalance } from '../../../store/slices/balanceSlice';

const useActions = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const topUpBalance = async (amount) => {
    try {
      setLoading(true);
      const response = await topUpApi(Number(amount));

      if (response.status === 0) {
        dispatch(setBalance(response.data.balance));
        return { success: true, message: response.message, balance: response.data.balance };
      }
      return { success: false, message: response.message, status: response.status };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Terjadi kesalahan',
        status: error.response?.data?.status || 500
      };
    } finally {
      setLoading(false);
    }
  };

  const refetchBalance = async () => {
    try {
      const response = await getBalanceAPI();
      if (response.status === 0) {
        dispatch(setBalance(response.data.balance));
      }
    } catch (error) {
      console.error('Failed to refetch balance:', error);
    }
  };

  return {
    topUpBalance,
    refetchBalance,
    loading
  };
};

export default useActions;
