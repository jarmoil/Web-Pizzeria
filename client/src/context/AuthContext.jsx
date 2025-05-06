import {createContext, useState, useEffect} from 'react';
import {loginUser} from '../services/authService';
import {getToken, setToken, removeToken} from '../utils/tokenStorage';

/**
 * AuthContext provides authentication-related data and functions to the application.
 * Includes the current user, login, logout, loading state, and error messages.
 */
export const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state and providing it to child components.
 * Handles user login, logout, and token management.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} The authentication context provider.
 */
export const AuthProvider = ({children}) => {
    /**
   * State for storing the current user.
   * @type {Object|null}
   * @property {string} token - The authentication token of the user.
   * @property {string} role - The role of the user (e.g., admin, user).
   */
  const [user, setUser] = useState(null);

  /**
   * State for managing the loading state during authentication operations.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State for storing error messages related to authentication.
   * @type {string|null}
   */
  const [error, setError] = useState(null);

  /**
   * Decodes a JWT token to extract its payload.
   *
   * @param {string} token - The JWT token to decode.
   * @returns {Object|null} The decoded payload or `null` if decoding fails.
   */

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  /**
   * Initializes the authentication state by checking for an existing token in storage.
   * Decodes the token and sets the user state if the token is valid.
   */
  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      decoded && setUser({token, role: decoded.role});
    }
  }, []);

  /**
   * Logs in the user by sending credentials to the server.
   * Stores the token and updates the user state upon successful login.
   *
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<void>}
   */
  const login = async (credentials) => {
    setLoading(true);
    try {
      const {token} = await loginUser(credentials);
      setToken(token);
      const decoded = decodeToken(token);
      decoded && setUser({token, role: decoded.role});
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the user by removing the token from storage and clearing the user state.
   */
  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};
