import {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import useUserManagement from '../../hooks/useUserManagement';

/**
 * UserManagement component for managing users and employees.
 * Allows registering new employees and editing user details.
 *
 * @returns {JSX.Element} The user management interface.
 */
const UserManagement = () => {
  const {user} = useAuth();
  const {users, loading, error, updateUser, registerEmployee} =
    useUserManagement(user?.token);

  /**
   * ID of the user being edited.
   * @type {number|null}
   */
  const [editingId, setEditingId] = useState(null);

  /**
   * Form data for registering a new employee.
   * @type {Object}
   * @property {string} user_name - Name of the employee.
   * @property {string} user_email - Email of the employee.
   * @property {string} user_password - Password for the employee.
   * @property {string} phone_number - Phone number of the employee.
   * @property {string} user_address - Address of the employee.
   */
  const [employeeForm, setEmployeeForm] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    phone_number: '',
    user_address: '',
  });

  /**
   * Form data for editing a user.
   * @type {Object}
   * @property {string} user_name - Name of the user.
   * @property {string} user_email - Email of the user.
   * @property {string} phone_number - Phone number of the user.
   * @property {string} user_address - Address of the user.
   */
  const [editForm, setEditForm] = useState({
    user_name: '',
    user_email: '',
    phone_number: '',
    user_address: '',
  });

  /**
   * Handles the submission of the employee registration form.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEmployee(employeeForm, user.token);
      setEmployeeForm({
        user_name: '',
        user_email: '',
        user_password: '',
        phone_number: '',
        user_address: '',
      });
    } catch (err) {
      console.error('Failed to register employee:', err);
    }
  };

  /**
   * Handles the submission of the user update form.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingId, editForm, user.token);
      setEditingId(null);
      setEditForm({
        user_name: '',
        user_email: '',
        phone_number: '',
        user_address: '',
      });
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  /**
   * Populates the edit form with the selected user's data.
   *
   * @param {Object} user - The user object to edit.
   * @param {number} user.user_id - The ID of the user.
   * @param {string} user.name - The name of the user.
   * @param {string} user.email - The email of the user.
   * @param {string} [user.phone_number] - The phone number of the user.
   * @param {string} [user.address] - The address of the user.
   */
  const handleEdit = (user) => {
    setEditingId(user.user_id);
    setEditForm({
      user_name: user.name,
      user_email: user.email,
      phone_number: user.phone_number || '',
      user_address: user.address || '',
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="user-management" className="managementPage-section">
      <h2 className="managementPage-section-title">User Management</h2>

      <div className="user-management-form">
        <h3>Register New Employee</h3>
        <form onSubmit={handleEmployeeSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={employeeForm.user_name}
            onChange={(e) =>
              setEmployeeForm({...employeeForm, user_name: e.target.value})
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={employeeForm.user_email}
            onChange={(e) =>
              setEmployeeForm({...employeeForm, user_email: e.target.value})
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={employeeForm.user_password}
            onChange={(e) =>
              setEmployeeForm({...employeeForm, user_password: e.target.value})
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={employeeForm.phone_number}
            onChange={(e) =>
              setEmployeeForm({...employeeForm, phone_number: e.target.value})
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={employeeForm.user_address}
            onChange={(e) =>
              setEmployeeForm({...employeeForm, user_address: e.target.value})
            }
          />
          <button type="submit">Register Employee</button>
        </form>
      </div>

      <div className="user-list">
        <h3>Manage Users</h3>
        {users.map((user) => (
          <div key={user.user_id} className="user-card">
            {editingId === user.user_id ? (
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  value={editForm.user_name}
                  onChange={(e) =>
                    setEditForm({...editForm, user_name: e.target.value})
                  }
                />
                <input
                  type="email"
                  value={editForm.user_email}
                  onChange={(e) =>
                    setEditForm({...editForm, user_email: e.target.value})
                  }
                />
                <input
                  type="tel"
                  value={editForm.phone_number}
                  onChange={(e) =>
                    setEditForm({...editForm, phone_number: e.target.value})
                  }
                />
                <input
                  type="text"
                  value={editForm.user_address}
                  onChange={(e) =>
                    setEditForm({...editForm, user_address: e.target.value})
                  }
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                  <p>Phone: {user.phone_number}</p>
                  <p>Address: {user.address}</p>
                </div>
                <button onClick={() => handleEdit(user)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserManagement;
