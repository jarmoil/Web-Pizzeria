import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const useAuth = () => {
  const {user, login, logout, loading, error} = useContext(AuthContext);

  return {
    token: user?.token,
    user,
    login,
    logout,
    loading,
    error,
  };
};

export {useAuth};
