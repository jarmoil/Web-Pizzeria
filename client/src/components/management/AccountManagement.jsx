import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useAccountManagement from '../../hooks/useAccountManagemenet';

const AccountManagement = () => {
  const { user } = useAuth();
  const userId = user?.user_id;
  const token = user?.token;

  const { userInfo, loading, error, updateAccount } = useAccountManagement(token, userId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    profile_picture: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fill the form with the current user info when it's fetched
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone_number: userInfo.phone_number || '',
        address: userInfo.address || '',
        profile_picture: userInfo.profile_picture || ''
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all form fields are included in the object, whether changed or not
    const updatedData = {
      user_name: formData.name || userInfo.name, // Default to original if no change
      user_email: formData.email || userInfo.email, // Default to original if no change
      phone_number: formData.phone_number || userInfo.phone_number, // Default to original if no change
      user_address: formData.address || userInfo.address, // Default to original if no change
      profile_picture: formData.profile_picture || userInfo.profile_picture // Default to original if no change
    };

    console.log('Updated Data to send:', updatedData);  // Debug here

    try {
      await updateAccount(updatedData); // Send updated data to API
      setIsEditing(false);  // Exit editing mode after successful update
      alert('Profile updated successfully!');

      // Refresh the page after successful update
      window.location.reload();
    } catch (err) {
      console.error('Failed to update account:', err);
      alert('An error occurred while updating your profile.');
    }
  };

  if (loading) return <p>Loading account info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Account Info</h2>
      <img
        src={
          formData.profile_picture?.startsWith('http')
            ? formData.profile_picture
            : `/uploads/${formData.profile_picture}`
        }
        alt="Profile"
        style={{ width: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />

      {!isEditing ? (
        <>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phone_number}</p>
          <p>Address: {formData.address}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone Number:</label>
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </div>
          <div>
            <label>Address:</label>
            <input name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <label>Profile Picture URL:</label>
            <input name="profile_picture" value={formData.profile_picture} onChange={handleChange} />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{ marginLeft: '1rem' }}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AccountManagement;
