import {useState, useEffect} from 'react';
import {getUserInfo, updateUser} from '../services/userService';

/**
 * Custom hook for managing user account information.
 * Fetches user data, updates user information, and handles loading and error states.
 *
 * @param {string} token - The authentication token for API requests.
 * @param {string} userId - The ID of the user whose account is being managed.
 * @returns {Object} An object containing user information, loading state, error state, and an update function.
 * @property {Object|null} userInfo - The user's account information.
 * @property {boolean} loading - Indicates whether the user data is being loaded.
 * @property {string|null} error - Error message if the user data fails to load or update.
 * @property {Function} updateAccount - Function to update the user's account information.
 */
const useAccountManagement = (token, userId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    /**
     * Fetches user information from the API.
     * Sets the user information, loading state, and error state accordingly.
     */
  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserInfo(userId, token);
        setUserInfo(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load user info:', err);
        setError('Failed to load user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId]);

  /**
   * Updates the user's account information.
   *
   * @param {Object} updatedData - The updated user data to send to the API.
   * @returns {Promise<void>} Resolves when the update is complete.
   * @throws {Error} If the update fails.
   */
  const updateAccount = async (updatedData) => {
    try {
      await updateUser(userId, updatedData, token);
      setUserInfo({...userInfo, ...updatedData});
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Failed to update user info');
    }
  };

  return { userInfo, loading, error, updateAccount };
};

export default useAccountManagement;
