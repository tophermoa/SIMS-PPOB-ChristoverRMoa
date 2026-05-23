import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../../api/endpoints/serviceApi';
import { setBanners } from '../../../store/slices/serviceSlice';

const useActions = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [bannersState, setBannersState] = useState([]);
  const fetched = useRef(false);

  const globalBanners = useSelector((state) => state.service.banners);

  const fetchBanners = async () => {
    if (fetched.current) return;
    fetched.current = true;

    try {
      setLoading(true);
      const response = await getBanners();

      if (response.status === 0) {
        dispatch(setBanners(response.data));
        setBannersState(response.data);
      }
    } catch (error) {
      return error.response?.data || { status: 500, message: "Terjadi kesalahan" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return {
    banners: bannersState.length > 0 ? bannersState : globalBanners,
    loading
  };
};

export default useActions;
