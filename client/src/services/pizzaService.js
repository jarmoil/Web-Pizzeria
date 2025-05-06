import {fetchData} from './fetchData';

/**
 * Fetches all pizzas from the menu.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of pizza objects.
 * @throws {Error} If the request fails.
 */
const getAllPizzas = async () => {
  return fetchData('api/v1/menu');
};

/**
 * Fetches the daily pizza from the menu.
 *
 * @returns {Promise<Object>} A promise that resolves to the daily pizza object.
 * @throws {Error} If the request fails.
 */
const getDailyPizza = async () => {
  return fetchData('api/v1/menu/daily');
};

/**
 * Adds a new menu item to the menu.
 *
 * @param {Object} menuData - The data for the new menu item.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const addMenuItem = async (menuData, token) => {
  try {
    const response = await fetchData('api/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    return response;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
};

/**
 * Updates an existing menu item.
 *
 * @param {number} id - The ID of the menu item to update.
 * @param {Object} menuData - The updated data for the menu item.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const updateMenuItem = async (id, menuData, token) => {
  try {
    const response = await fetchData(`api/v1/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    return response;
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

/**
 * Deletes a menu item from the menu.
 *
 * @param {number} id - The ID of the menu item to delete.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const deleteMenuItem = async (id, token) => {
  try {
    const response = await fetchData(`api/v1/menu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

export {
  getAllPizzas,
  getDailyPizza,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
