import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

/**
 * Custom hook for accessing the authentication context.
 * Provides access to authentication-related data and functions.
 * Throws an error if used outside of an `AuthProvider`.
 *
 * @returns {Object} The authentication context value.
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 */
const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an UserProvider');
  }

  return context;
};

export {useUserContext};
