import {useState, useEffect, useCallback} from 'react';
import {
  getAllUsers,
  updateUser,
  registerEmployee,
} from '../services/userService';

const useUserManagement = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getAllUsers(token);
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleUpdateUser = async (userId, userData) => {
    try {
      await updateUser(userId, userData, token);
      await fetchUsers();
    } catch (err) {
      setError('Failed to update user', err);
    }
  };

  const handleRegisterEmployee = async (employeeData) => {
    try {
      await registerEmployee(employeeData, token);
      await fetchUsers();
    } catch (err) {
      setError('Failed to register employee', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    updateUser: handleUpdateUser,
    registerEmployee: handleRegisterEmployee,
  };
};

export default useUserManagement;
