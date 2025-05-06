import { registerUser } from './userService';

/**
 * Handles user registration by validating the form data and calling the registration service.
 * Alerts the user if passwords do not match or if registration fails.
 *
 * @param {Object} formData - The form data submitted by the user.
 * @param {string} formData.user_name - The name of the user.
 * @param {string} formData.email - The email address of the user.
 * @param {string} formData.psw - The password entered by the user.
 * @param {string} formData.pswRepeat - The repeated password entered by the user.
 * @returns {Promise<void>} Resolves when the registration process is complete.
 */
export const handleRegistration = async (formData) => {
  if (formData.psw !== formData.pswRepeat) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const userData = {
      user_name: formData.user_name,
      user_email: formData.email,
      user_password: formData.psw,
    };

    const response = await registerUser(userData); // Call the service function
    alert('Registration successful!');
    console.log(response);
  } catch (error) {
    console.error('Error registering user:', error.message);
    alert('Registration failed. Please try again.');
  }
};
