// contextHooks.js
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';


const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an UserProvider');
  }

  return context;
};

export {useUserContext};
