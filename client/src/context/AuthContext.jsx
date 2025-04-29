import {createContext, useState, useEffect} from 'react';
import {loginUser} from '../services/authService';
import {getToken, setToken, removeToken} from '../utils/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to decode the JWT token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
      return payload;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token); // Decode the token
      if (decoded) {
        setUser({ token, role: decoded.role }); // Store the role in the user state
      }
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await loginUser(credentials); // Get the token from the backend
      setToken(token);
      const decoded = decodeToken(token); // Decode the token
      if (decoded) {
        setUser({ token, role: decoded.role }); // Store the role in the user state
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
