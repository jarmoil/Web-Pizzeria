import './App.css';
import Layout from './components/Layout';
import FrontPage from './pages/FrontPage';
import ManagementPage from './pages/ManagementPage';
import Location from './components/Location';
import {Route, Routes} from 'react-router-dom';
import ForgotPassword from './components/user/ForgotPassword';
import SignUp from './components/user/SignUp';
import MenuPage from './pages/MenuPage';
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import AccountPage from './pages/AccountPage';

/**
 * The main application component that defines the structure and routing of the app.
 * Includes routes for various pages such as the front page, menu, management page, and more.
 * Wraps the application in the `AuthProvider` to provide authentication context.
 *
 * @component
 * @returns {JSX.Element} The main application layout with routing.
 */
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<FrontPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route
              path="/managementPage"
              element={
                <ProtectedRoute>
                  <ManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accountPage"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="/location" element={<Location />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Additional routes for other pages */}
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/faq" element={<div>FAQ Page</div>} />
            <Route
              path="/privacy-policy"
              element={<div>Privacy Policy Page</div>}
            />
            <Route path="/help" element={<div>Help Page</div>} />
            <Route
              path="/terms-conditions"
              element={<div>Terms & Conditions Page</div>}
            />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
