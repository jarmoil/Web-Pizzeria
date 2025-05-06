import { useEffect, useState } from 'react';
import {useAuth} from '../../hooks/useAuth';
import { getUserInfo } from '../services/userService';

const UserProfile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      if (user?.token && user?.user_id) {
        try {
          const data = await getUserInfo(user.token, user.user_id);
          setUserInfo(data);
        } catch (error) {
          console.error('Failed to load user info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInfo();
  }, [user]);

  if (loading) return <p>Loading user info...</p>;
  if (!userInfo) return <p>No user info available.</p>;

  return (
    <div>
      <h2>Welcome, {userInfo.name}</h2>
      <p>Email: {userInfo.email}</p>
      <p>Phone: {userInfo.phone_number}</p>
      <p>Address: {userInfo.user_address}</p>
      <p>Role: {userInfo.role}</p>
      <p>Picture: {userInfo.profile_picture}</p>
    </div>
  );
};

export default UserProfile;
