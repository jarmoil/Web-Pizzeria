import MenuManagement from '../components/MenuManagement';
import OrderManagement from '../components/OrderManagement';

const ManagementPage = () => {
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
        </ul>
      </nav>

      <div className="managementPage-content">
        <MenuManagement />
        <OrderManagement />
      </div>
    </main>
  );
};

export default ManagementPage;
