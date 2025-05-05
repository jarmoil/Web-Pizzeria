import MenuManagement from '../components/MenuManagement';
import OrderManagement from '../components/OrderManagement';
import UserManagement from '../components/UserManagement';
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
        {isAdmin && <UserManagement />}
      </div>
    </main>
  );
};

export default ManagementPage;
