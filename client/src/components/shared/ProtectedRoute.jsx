import { Navigate } from 'react-router';
import { useUserContext } from '../../hooks/contextHooks';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while checking authentication
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
