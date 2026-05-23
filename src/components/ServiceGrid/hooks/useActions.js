import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getServices } from '../../../api/endpoints/serviceApi';
import { setServices, setServicesSelected } from '../../../store/slices/serviceSlice';

const useActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [servicesState, setServicesState] = useState([]);
  const fetched = useRef(false);

  const fetchServices = async () => {
    if (fetched.current) return;
    fetched.current = true;

    try {
      setLoading(true);
      const response = await getServices();

      if (response.status === 0) {
        // save to global state
        dispatch(setServices(response.data));

        setServicesState(response.data);
      }
    } catch (error) {
      return error.response?.data || { status: 500, message: "Terjadi kesalahan" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const navigateToService = (serviceCode, serviceSelected) => {

    dispatch(setServicesSelected(serviceSelected));
    navigate(`/payment/${serviceCode}`);
  };

  return {
    services: servicesState,
    loading,
    navigateToService,
  };
};

export default useActions;
