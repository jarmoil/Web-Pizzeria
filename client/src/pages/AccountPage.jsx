import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountManagement from '../components/management/AccountManagement';
import { useAuth } from '../hooks/useAuth';

/**
 * AccountPage component for displaying the user's account page.
 * Redirects the user to the login page if they are not logged in.
 * Displays the account management interface for logged-in users.
 *
 * @component
 * @returns {JSX.Element} The account page with account management functionality, or a redirect to the login page.
 */
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
