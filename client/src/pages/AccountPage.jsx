import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountManagement from '../components/management/AccountManagement';
import { useAuth } from '../hooks/useAuth';

const AccountPage = () => {
  const { user } = useAuth();

  // If not logged in, redirecting user to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Account</h1>
      <AccountManagement />
    </div>
  );
};

export default AccountPage;
