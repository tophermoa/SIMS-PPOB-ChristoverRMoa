import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { paymentTransaction } from '../../../api/endpoints/transactionApi';
import { getBalanceAPI } from '../../../api/endpoints/balanceApi';
import { setBalance } from '../../../store/slices/balanceSlice';
import { getServices } from '../../../api/endpoints/serviceApi';
import { setServicesSelected } from '../../../store/slices/serviceSlice';

const useActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceCode } = useParams();
  const serviceSelected = useSelector((state) => state.service.servicesSelected);

  const [loading, setLoading] = useState(false);

  // fetch services array if user refresh the page
  useEffect(() => {
    if (!serviceSelected) {
      const fetchService = async () => {
        try {
          const response = await getServices();
          if (response.status === 0) {
            const found = response.data.find(s => s.service_code === serviceCode);
            if (found) {
              dispatch(setServicesSelected(found));
            } else {
              navigate('/home');
            }
          }
        } catch (error) {
          navigate('/home');
        }
      };
      fetchService();
    }
  }, [serviceSelected, serviceCode, dispatch, navigate]);

  const payService = async (serviceCode) => {
    try {
      setLoading(true);
      const response = await paymentTransaction(serviceCode);

      if (response.status === 0) {
        return {
          success: true,
          message: response.message,
          data: response.data
        };
      }

      // handle if response.status doestn 0
      return {
        success: false,
        message: response.message,
        status: response.status
      };
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
    serviceSelected,
    payService,
    refetchBalance,
    loading
  };
};

export default useActions;
