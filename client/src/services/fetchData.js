
/**
 * Logs in a user by sending their email and password to the server.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The response data from the server, including the authentication token if successful.
 * @throws {Error} If the login request fails.
 */
export const fetchData = async (url, options = {}) => {
  const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/'
      : import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + url;

  const response = await fetch(fullUrl, options);
  const json = await response.json();

  if (!response.ok) {
    console.error('API error:', fullUrl, json);
    throw new Error(
      json.message
        ? `${json.message}, koodi:${response.status}`
        : `Error ${response.status}`
    );
  }

  return json;
};
