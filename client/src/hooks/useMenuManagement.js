import {useState} from 'react';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../services/pizzaService';
import usePizzas from './usePizzas';

/**
 * Custom hook for managing the menu items in the application.
 * Provides functionality to add, update, and delete menu items, as well as access to the current list of pizzas.
 *
 * @returns {Object} An object containing:
 * - `pizzas` {Object[]}: The current list of pizzas.
 * - `loading` {boolean}: Indicates whether the menu data is being loaded.
 * - `error` {string|null}: Error message if any operation fails.
 * - `addMenuItem` {Function}: Function to add a new menu item.
 * - `updateMenuItem` {Function}: Function to update an existing menu item.
 * - `deleteMenuItem` {Function}: Function to delete a menu item.
 */
const useMenuManagement = () => {
  const {pizzas, loading, error, fetchPizzas} = usePizzas();
  const [managementError, setManagementError] = useState(null);

  /**
   * Adds a new menu item to the menu.
   *
   * @param {Object} menuData - The data for the new menu item.
   * @param {string} token - The authentication token for the request.
   * @throws {Error} If the operation fails or no token is provided.
   */
  const handleAddMenuItem = async (menuData, token) => {
    try {
      if (!token) {
        throw new Error('No authentication token provided');
      }
      await addMenuItem(menuData, token);
      await fetchPizzas();
    } catch (error) {
      console.error('Failed to add menu item:', error);
      setManagementError('Failed to add menu item.');
      throw error;
    }
  };

  /**
   * Updates an existing menu item.
   *
   * @param {number} id - The ID of the menu item to update.
   * @param {Object} menuData - The updated data for the menu item.
   * @param {string} token - The authentication token for the request.
   * @throws {Error} If the operation fails.
   */
  const handleUpdateMenuItem = async (id, menuData, token) => {
    try {
      await updateMenuItem(id, menuData, token);
      await fetchPizzas();
    } catch (error) {
      console.error('Failed to update menu item:', error);
      setManagementError('Failed to update menu item.');
      throw error;
    }
  };

  /**
   * Deletes a menu item from the menu.
   *
   * @param {number} id - The ID of the menu item to delete.
   * @param {string} token - The authentication token for the request.
   * @throws {Error} If the operation fails.
   */
  const handleDeleteMenuItem = async (id, token) => {
    try {
      await deleteMenuItem(id, token);
      await fetchPizzas();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      setManagementError('Failed to delete menu item.');
      throw error;
    }
  };
  return {
    pizzas,
    loading,
    error: error || managementError,
    addMenuItem: handleAddMenuItem,
    updateMenuItem: handleUpdateMenuItem,
    deleteMenuItem: handleDeleteMenuItem,
  };
};
export default useMenuManagement;
