import {fetchData} from './fetchData.js';

/**
 * Logs in a user by sending their email and password to the server.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The response data from the server, including the authentication token if successful.
 * @throws {Error} If the login request fails.
 */
export const loginUser = async ({email, password}) => {
  return await fetchData('api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_email: email, user_password: password}),
  });
};
