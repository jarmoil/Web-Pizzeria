import {fetchData} from './fetchData';

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

export const getUserInfo = async (token) => {
  try {
    const response = await fetchData(`api/v1/users/${userId}`, {
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
