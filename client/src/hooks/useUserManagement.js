import {useState, useEffect, useCallback} from 'react';
import {
  getAllUsers,
  updateUser,
  registerEmployee,
} from '../services/userService';

/**
 * Custom hook for managing users in the application.
 * Fetches all users, updates user information, and registers new employees.
 *
 * @param {string} token - The authentication token for API requests.
 * @returns {Object} An object containing:
 * - `users` {Object[]}: An array of user objects.
 *   - `id` {number}: The unique ID of the user.
 *   - `name` {string}: The name of the user.
 *   - `email` {string}: The email address of the user.
 *   - `role` {string}: The role of the user (e.g., "admin", "employee").
 * - `loading` {boolean}: Indicates whether the user data is being loaded.
 * - `error` {string|null}: Error message if fetching, updating, or registering users fails.
 * - `updateUser` {Function}: Function to update user information.
 * - `registerEmployee` {Function}: Function to register a new employee.
 */
const useUserManagement = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all users from the server.
   * Updates the `users` state with the fetched data.
   *
   * @async
   * @returns {Promise<void>}
   */
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

  /**
   * Updates the information of a specific user.
   * Refreshes the user list after a successful update.
   *
   * @async
   * @param {number} userId - The ID of the user to update.
   * @param {Object} userData - The updated data for the user.
   * @returns {Promise<void>}
   */
  const handleUpdateUser = async (userId, userData) => {
    try {
      await updateUser(userId, userData, token);
      await fetchUsers();
    } catch (err) {
      setError('Failed to update user', err);
    }
  };

  /**
   * Registers a new employee.
   * Refreshes the user list after a successful registration.
   *
   * @async
   * @param {Object} employeeData - The data for the new employee.
   * @returns {Promise<void>}
   */
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
