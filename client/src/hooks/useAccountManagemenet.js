import {useState, useEffect} from 'react';
import {getUserInfo} from '../services/userService';

const useAccountManagement = (token, userId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserInfo(userId, token);
        console.log(data);
        setUserInfo(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load user info:', err);
        setError('Failed to load user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId]);

  return {userInfo, loading, error};
};

export default useAccountManagement;
