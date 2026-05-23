import { useEffect, useState, useRef } from 'react';
import { getBalanceAPI } from '../../../api/endpoints/balanceApi';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../../../store/slices/balanceSlice';

const useActions = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fetched = useRef(false);

  const globalBalance = useSelector((state) => state.balance.balance);

  const getBalance = async () => {
    if (fetched.current) return;
    fetched.current = true;

    try {
      setLoading(true);
      const response = await getBalanceAPI();

      if (response.status === 0) {
        // save to global state
        dispatch(setBalance(response.data.balance));
      }
    } catch (error) {
      // console.log(error.response.data)
      // return error.response.data;
      return error.response?.data || { status: 500, message: "Terjadi kesalahan" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return {
    balanceState: globalBalance,
    loading
  };
};

export default useActions;
