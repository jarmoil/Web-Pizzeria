import {createContext, useState, useEffect} from 'react';
import {loginUser} from '../services/authService';
import {getToken, setToken, removeToken} from '../utils/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({token});
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const {token, user} = await loginUser(credentials);
      setToken(token);
      setUser(user);
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
