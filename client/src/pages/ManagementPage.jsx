import MenuManagement from '../components/management/MenuManagement';
import OrderManagement from '../components/management/OrderManagement';
import ReviewManagement from '../components/management/ReviewManagement';
import UserManagement from '../components/management/UserManagement';
import {useAuth} from '../hooks/useAuth';

const ManagementPage = () => {
  const {user} = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <main className="managementPage-main-wrapper">
      <nav className="managementPage-sidebar">
        <ul className="managementPage-sidebar-menu">
          <li>
            <a href="#menu-management" className="managementPage-sidebar-link">
              Menu Management
            </a>
          </li>
          <li>
            <a href="#order-management" className="managementPage-sidebar-link">
              Order Management
            </a>
          </li>
          <li>
            <a
              href="#review-management"
              className="managementPage-sidebar-link"
            >
              Review Management
            </a>
          </li>
          {isAdmin && (
            <li>
              <a
                href="#user-management"
                className="managementPage-sidebar-link"
              >
                User Management
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div className="managementPage-content">
        <MenuManagement />
        <OrderManagement />
        <ReviewManagement />
        {isAdmin && <UserManagement />}
      </div>
    </main>
  );
};

export default ManagementPage;
