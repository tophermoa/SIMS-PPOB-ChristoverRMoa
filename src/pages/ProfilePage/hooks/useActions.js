import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProfileAPI, updateProfileAPI, updateProfileImageAPI } from '../../../api/endpoints/profileApi';
import { setProfile } from '../../../store/slices/profileSlice';
import { getNavigate } from '../../../utils/NavigationService';

const useActions = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const response = await updateProfileAPI({
        first_name: formData.firstName,
        last_name: formData.lastName
      });

      if (response.status === 0) {
        dispatch(setProfile({
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profileImage: response.data.profile_image
        }));
        return { success: true, message: response.message };
      }

      // handle if status s=== 108
      if (response.status === 108) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
        return { success: false, message: response.message };
      }

      // if status not both
      return { success: false, message: response.message || 'Bad Request' };
    } catch (error) {
      if (error.response?.data?.status === 108 || error.response?.status === 401) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
      }
      return { success: false, message: error.response?.data?.message || 'Terjadi kesalahan' };
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfileAPI();
      if (response.status === 0) {
        dispatch(setProfile({
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profileImage: response.data.profile_image
        }));
      } else if (response.status === 108) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
      } else {
        return { success: false, message: response.message || 'Bad Request' };
      }
    } catch (error) {
      if (error.response?.data?.status === 108 || error.response?.status === 401) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutFunc = () => {
    localStorage.removeItem('token');
    const navigate = getNavigate();
    // console.log(navigate)
    if (navigate) navigate('/login');
  };

  const updateProfileImage = async (file) => {
    try {
      setLoading(true);
      const response = await updateProfileImageAPI(file);

      if (response.status === 0) {
        dispatch(setProfile({
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profileImage: response.data.profile_image
        }));
        return { success: true, message: response.message };
      }

      if (response.status === 108) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
        return { success: false, message: response.message };
      }

      return { success: false, message: response.message || 'Format Image tidak sesuai' };
    } catch (error) {
      if (error.response?.data?.status === 108 || error.response?.status === 401) {
        localStorage.removeItem('token');
        const navigate = getNavigate();
        if (navigate) navigate('/login');
      }
      return { success: false, message: error.response?.data?.message || 'Terjadi kesalahan' };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    fetchProfile,
    logoutFunc,
    updateProfileImage,
    loading
  };
};

export default useActions;
