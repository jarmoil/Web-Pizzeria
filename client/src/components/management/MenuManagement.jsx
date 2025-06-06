import {useState} from 'react';
import useMenuManagement from '../../hooks/useMenuManagement';
import {useAuth} from '../../hooks/useAuth';


/**
 * Weekday labels for daily pizza selection.
 * @constant
 * @type {Object}
 */
const WEEKDAYS = {
  mon: 'Maanantai',
  tue: 'Tiistai',
  wed: 'Keskiviikko',
  thu: 'Torstai',
  fri: 'Perjantai',
  sat: 'Lauantai',
  sun: 'Sunnuntai',
};

/**
 * MenuManagement component for managing the pizza menu.
 * Allows adding, editing, and deleting pizzas, as well as marking pizzas as daily specials.
 *
 * @returns {JSX.Element} The menu management interface.
 */
const MenuManagement = () => {
  const {user} = useAuth();
  const {pizzas, loading, error, addMenuItem, updateMenuItem, deleteMenuItem} =
    useMenuManagement();

  /**
   * Form data for adding or editing a pizza.
   * @type {Object}
   * @property {string} name - Name of the pizza.
   * @property {string} description - Description of the pizza.
   * @property {string} price - Price of the pizza.
   * @property {string} image - Image URL of the pizza.
   * @property {string} daily_weekday - Weekday for daily pizza (optional).
   */
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    daily_weekday: '',
  });

  /**
   * ID of the pizza being edited.
   * @type {number|null}
   */
  const [editingId, setEditingId] = useState(null);

  /**
   * Handles form submission for adding or updating a pizza.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updateData = {
          pizza_name: formData.name,
          pizza_description: formData.description,
          price: parseFloat(formData.price),
          image_url: formData.image,
          daily_weekday: formData.daily_weekday || null,
        };
        await updateMenuItem(editingId, updateData, user.token);
      } else {
        const newPizzaData = {
          pizza_name: formData.name,
          pizza_description: formData.description,
          price: Number(formData.price), // Ensure it's a number
          image_url: formData.image,
        };
        console.log('Submitting new pizza:', newPizzaData); // Debug log
        await addMenuItem(newPizzaData, user.token);
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        daily_weekday: '',
      });
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save menu item:', err);
      // Add more detailed error logging
      if (err.response) {
        console.error('Response data:', err.response.data);
      }
    }
  };

  /**
   * Populates the form with data for editing a pizza.
   *
   * @param {Object} pizza - The pizza object to edit.
   */
  const handleEdit = (pizza) => {
    setFormData({
      name: pizza.pizza_name,
      description: pizza.pizza_description,
      price: pizza.price,
      image: pizza.image_url,
      daily_weekday: pizza.daily_weekday || '',
    });
    setEditingId(pizza.pizza_id);
  };

  /**
   * Cancels the editing process and resets the form.
   */
  const handleCancelEdit = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      daily_weekday: '',
    });
    setEditingId(null);
  };

  /**
   * Deletes a pizza from the menu.
   *
   * @param {number} id - The ID of the pizza to delete.
   * @returns {Promise<void>}
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(id, user.token);
      } catch (err) {
        console.error('Failed to delete menu item:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="menu-management" className="managementPage-section">
      <h2 className="managementPage-section-title">Menu Management</h2>

      <form onSubmit={handleSubmit} className="menu-management-form">
        <input
          type="text"
          placeholder="Pizza Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({...formData, description: e.target.value})
          }
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />
        {editingId && (
          <select
            value={formData.daily_weekday || ''}
            onChange={(e) =>
              setFormData({...formData, daily_weekday: e.target.value})
            }
          >
            <option value="">Not a daily pizza</option>
            {Object.entries(WEEKDAYS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
        <div className="form-buttons">
          <button type="submit">
            {editingId ? 'Update Pizza' : 'Add New Pizza'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="cancel-edit-btn"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="menu-items-list">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="menu-item-card">
            <img src={pizza.image_url} alt={pizza.pizza_name} />
            <h3>{pizza.pizza_name}</h3>
            <p>{pizza.pizza_description}</p>
            <p>€{pizza.price}</p>
            {pizza.daily_weekday && (
              <p className="menu-item-daily">
                Päivän pizza: {WEEKDAYS[pizza.daily_weekday]}
              </p>
            )}
            <div className="menu-item-actions">
              <button onClick={() => handleEdit(pizza)}>Edit</button>
              <button onClick={() => handleDelete(pizza.pizza_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuManagement;
