import {useState, useEffect} from 'react';
import {useAuth} from '../../hooks/useAuth';
import useAccountManagement from '../../hooks/useAccountManagemenet';
import useOwnOrders from '../../hooks/useOwnOrders';

/**
 * AccountManagement component for managing and updating user account information.
 * Displays user information and allows editing of account details such as name, email, phone number, address, and profile picture.
 *
 * @component
 * @returns {JSX.Element} The account management interface.
 */
const AccountManagement = () => {
  const {user} = useAuth();
  const userId = user?.user_id;
  const token = user?.token;
  const {userInfo, loading, error, updateAccount} = useAccountManagement(
    token,
    userId
  );
  const {orders, loadingo, erroro, cancelOrder} = useOwnOrders(user?.token);

  /**
   * State for managing the form data.
   * @type {Object}
   * @property {string} name - The user's name.
   * @property {string} email - The user's email address.
   * @property {string} phone_number - The user's phone number.
   * @property {string} address - The user's address.
   * @property {string} profile_picture - The URL of the user's profile picture.
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    profile_picture: '',
  });

  /**
   * State for managing whether the form is in editing mode.
   * @type {boolean}
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Fills the form with the current user information when it is fetched.
   */
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone_number: userInfo.phone_number || '',
        address: userInfo.address || '',
        profile_picture: userInfo.profile_picture || '',
      });
    }
  }, [userInfo]);

  /**
   * Handles changes to the form inputs.
   *
   * @param {Object} e - The event object.
   * @param {string} e.target.name - The name of the input field.
   * @param {string} e.target.value - The value of the input field.
   */
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  /**
   * Handles the form submission to update user account information.
   *
   * @param {Object} e - The event object.
   * @returns {Promise<void>} Resolves when the update is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all form fields are included in the object, whether changed or not
    const updatedData = {
      user_name: formData.name || userInfo.name, // Default to original if no change
      user_email: formData.email || userInfo.email, // Default to original if no change
      phone_number: formData.phone_number || userInfo.phone_number, // Default to original if no change
      user_address: formData.address || userInfo.address, // Default to original if no change
      profile_picture: formData.profile_picture || userInfo.profile_picture, // Default to original if no change
    };

    console.log('Updated Data to send:', updatedData); // Debug here

    try {
      await updateAccount(updatedData); // Send updated data to API
      setIsEditing(false); // Exit editing mode after successful update
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
  if (loadingo) return <div>Loading...</div>;
  if (erroro) return <div>Error: {erroro}</div>;

  return (
    <div className="account-page">
      <section className="account-info-section">
        <div className="account-header">
          <img
            className="profile-image"
            src={
              formData.profile_picture?.startsWith('http')
                ? formData.profile_picture
                : `/uploads/${formData.profile_picture}`
            }
            alt="Profile"
          />

          {!isEditing ? (
            <div className="account-details">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                {formData.phone_number || 'Not provided'}
              </p>
              <p>
                <strong>Address:</strong> {formData.address || 'Not provided'}
              </p>
              <button
                className="btn btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form className="edit-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Profile Picture URL:</label>
                <input
                  name="profile_picture"
                  value={formData.profile_picture}
                  onChange={handleChange}
                />
              </div>
              <div className="button-group">
                <button type="submit" className="btn btn-edit">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="orders-section">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>Loading orders</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.order_id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.order_id}</h3>
                  <span className={`status ${order.order_status}`}>
                    {order.order_status}
                  </span>
                </div>

                <div className="order-details">
                  <p>Total: €{order.total_price}</p>
                  <p>Type: {order.is_pickup ? 'Pickup' : 'Delivery'}</p>
                  {!order.is_pickup && <p>Address: {order.address}</p>}
                  <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item.order_item_id} className="order-item">
                      <span>{item.pizza_name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                {order.order_status === 'pending' && (
                  <button
                    onClick={() => cancelOrder(order.order_id)}
                    className="cancel-button"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AccountManagement;
