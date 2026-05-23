import { useState } from 'react';
import { loginUserAPI } from '../../../api/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/slices/authSlice';

const useActions = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUserAPI(email, password);

      // console.log(response)
      if (response.status === 0 && response.data?.token) {
        dispatch(setToken(response.data.token));
      }
      return response;
    } catch (error) {
      // console.log(error.response.data)
      // return error.response.data;
      return error.response?.data || { status: 500, message: "Terjadi kesalahan" };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginUser
  };
};

export default useActions;
