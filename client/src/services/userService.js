export const registerUser = async (userData) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    throw new Error(error.message); // Throw the error to be handled by the caller
  }
};
