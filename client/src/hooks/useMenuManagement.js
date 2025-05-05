import {useState} from 'react';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../services/pizzaService';
import usePizzas from './usePizzas';

const useMenuManagement = () => {
  const {pizzas, loading, error, fetchPizzas} = usePizzas();
  const [managementError, setManagementError] = useState(null);

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
