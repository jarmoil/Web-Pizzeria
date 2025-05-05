import {fetchData} from './fetchData';

const getAllPizzas = async () => {
  return fetchData('api/v1/menu');
};

const getDailyPizza = async () => {
  return fetchData('api/v1/menu/daily');
};

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
