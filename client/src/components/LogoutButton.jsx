import {useAuth} from '../hooks/useAuth';

const LogoutButton = () => {
  const {user, logout} = useAuth();

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
