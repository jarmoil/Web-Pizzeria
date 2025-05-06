import {useAuth} from '../../hooks/useAuth';

/**
 * LogoutButton component for logging out the current user.
 * Displays a logout button if the user is logged in and reloads the page upon logout.
 *
 * @returns {JSX.Element|null} A logout button if the user is logged in, or `null` if no user is logged in.
 */
const LogoutButton = () => {
  const {user, logout} = useAuth();

  /**
   * Handles the logout process.
   * Calls the `logout` function and reloads the page.
   */
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return user ? (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  ) : null;
};

export default LogoutButton;
