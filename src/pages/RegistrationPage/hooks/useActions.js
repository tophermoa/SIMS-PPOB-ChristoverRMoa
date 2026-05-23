import { useState } from 'react';
import { registerUserAPI } from '../../../api/endpoints/authApi';

const useActions = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (data) => {
    try {
      setLoading(true);

      const response = await registerUserAPI(data);

      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data)
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading
  };
};

export default useActions;
