import {fetchData} from './fetchData';

/**
 * Registers a new user.
 *
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.user_name - The name of the user.
 * @param {string} userData.user_email - The email address of the user.
 * @param {string} userData.user_password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetchData('api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Fetches all users.
 *
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 * @throws {Error} If the request fails.
 */
export const getAllUsers = async (token) => {
  try {
    const response = await fetchData('api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Updates a user's information.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {Object} userData - The updated data for the user.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await fetchData(`api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Registers a new employee.
 *
 * @param {Object} employeeData - The data for the new employee.
 * @param {string} employeeData.user_name - The name of the employee.
 * @param {string} employeeData.user_email - The email address of the employee.
 * @param {string} employeeData.user_password - The password of the employee.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
export const registerEmployee = async (employeeData, token) => {
  try {
    const response = await fetchData('api/v1/users/register-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });
    return response;
  } catch (error) {
    console.error('Error registering employee:', error);
    throw error;
  }
};
