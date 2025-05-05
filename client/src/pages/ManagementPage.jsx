import MenuManagement from '../components/MenuManagement';

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
        </ul>
      </nav>

      <div className="managementPage-content">
        <MenuManagement />
      </div>
    </main>
  );
};

export default ManagementPage;
