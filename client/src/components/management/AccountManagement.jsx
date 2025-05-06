import {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import useAccountManagement from '../../hooks/useAccountManagemenet';

const AccountManagement = () => {
  const { user } = useAuth();
  const userId = user?.user_id;
  const token = user?.token;

  const { userInfo, loading, error } = useAccountManagement(token, userId);

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Account Info</h2>
      <img
      src={userInfo.profile_picture.startsWith('http')
        ? userInfo.profile_picture
        : `/uploads/${userInfo.profile_picture}`}
        alt="Profile"
        style={{ width: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Phone Number: {userInfo.phone_number}</p>
      <p>Address: {userInfo.address}</p>
      <p>Role: {userInfo.role}</p>
    </div>
  );
};

export default AccountManagement;
