import {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import useAccountManagement from '../../hooks/useAccountManagement';

const AccountDetails = () => {
  const { user } = useAuth();
  const userId = user?.user_id;
  const token = user?.token;

  const { userInfo, loading, error } = useAccountManagement(token, userId);

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Account Info</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Phone Number: {userInfo.phone_number}</p>
      <p>Address: {userInfo.user_address}</p>
      <p>Profile Picture: {userInfo.profile_picture}</p>
      <p>Role: {userInfo.role}</p>
    </div>
  );
};
