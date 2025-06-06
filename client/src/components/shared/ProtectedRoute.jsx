import { Navigate } from 'react-router';
import { useUserContext } from '../../hooks/contextHooks';

/**
 * ProtectedRoute component for restricting access to certain routes.
 * Redirects users to the homepage if they are not logged in, or to an unauthorized page if they lack the required roles.
 *
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - The child components to render if access is granted.
 * @param {string[]} [props.requiredRoles] - An optional array of roles required to access the route.
 * @returns {JSX.Element} The child components if access is granted, or a redirect if access is denied.
 */
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
