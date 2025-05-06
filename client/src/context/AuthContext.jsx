import {createContext, useState, useEffect} from 'react';
import {loginUser} from '../services/authService';
import {getToken, setToken, removeToken} from '../utils/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          token,
          user_id: decoded.user_id,
          role: decoded.role
        });
      }
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const {token} = await loginUser(credentials);
      setToken(token);
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          token,
          user_id: decoded.user_id,
          role: decoded.role,
        });
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
