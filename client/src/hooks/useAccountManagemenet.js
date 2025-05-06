import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api/userApi';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          return;
        }

        const userData = await getUserInfo(token);
        setUser(userData);
      } catch (err) {
        console.error('Failed to load user info:', err);
        setError('Failed to load user data');
      }
    };

    fetchUserInfo();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="user-profile">
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone_number}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.profile_picture && (
        <img
          src={user.profile_picture}
          alt="Profile"
          style={{ width: '150px', borderRadius: '10px', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

export default UserProfile;
