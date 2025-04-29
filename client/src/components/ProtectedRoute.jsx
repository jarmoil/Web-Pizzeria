// ProtectedRoute.jsx
import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children, requiredRoles}) => {
  const {user} = useUserContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }

  return children;
};

export default ProtectedRoute;
