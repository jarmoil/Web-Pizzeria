const TOKEN_KEY = 'authToken';

/**
 * Retrieves the authentication token from local storage.
 *
 * @returns {string|null} The authentication token, or `null` if it does not exist.
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Stores the authentication token in local storage.
 *
 * @param {string} token - The authentication token to store.
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

/**
 * Removes the authentication token from local storage.
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
