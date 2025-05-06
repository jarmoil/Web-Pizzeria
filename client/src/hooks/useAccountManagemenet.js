import {useState, useEffect} from 'react';
import {getUserInfo, updateUser} from '../services/userService';

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

  const updateAccount = async (updatedData) => {
    try {
      await updateUser(userId, updatedData, token);
      setUserInfo({...userInfo, ...updatedData});
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Failed to update user info');
    }
  };

  return { userInfo, loading, error, updateAccount };
};

export default useAccountManagement;
