import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

/**
 * Custom hook for accessing the authentication context.
 * Provides authentication-related data and functions, such as the current user, login, logout, loading state, and errors.
 *
 * @returns {Object} An object containing authentication-related data and functions:
 * - `token` {string|null}: The authentication token of the current user.
 * - `role` {string|null}: The role of the current user (e.g., admin, user).
 * - `user` {Object|null}: The current user object.
 * - `login` {Function}: Function to log in the user.
 * - `logout` {Function}: Function to log out the user.
 * - `loading` {boolean}: Indicates if an authentication operation is in progress.
 * - `error` {string|null}: Error message related to authentication.
 */
const useAuth = () => {
  const {user, login, logout, loading, error} = useContext(AuthContext);

  return {
    token: user?.token,
    role: user?.role,
    user,
    login,
    logout,
    loading,
    error,
  };
};

export {useAuth};
