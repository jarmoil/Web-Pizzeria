import { registerUser } from './userService';

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
