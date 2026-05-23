import { useEffect, useState, useRef } from 'react';
import { getProfileAPI } from '../../../api/endpoints/profileApi';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../../store/slices/profileSlice';

const useActions = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfileState] = useState({
    firstName: '',
    lastName: '',
    profileImage: null,
    email: '',
  });
  const dispatch = useDispatch();
  const fetched = useRef(false);

  const getProfile = async () => {
    if (fetched.current) return;
    fetched.current = true;

    try {
      setLoading(true);
      const response = await getProfileAPI();

      if (response.status === 0) {
        // save to global state
        dispatch(setProfile({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profileImage: response.data.profile_image,
          email: response.data.email
        }));

        setProfileState({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profileImage: response.data.profile_image,
          email: response.data.email
        })
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
    getProfile();
  }, []);

  return {
    ...profile,
    loading
  };
};

export default useActions;
