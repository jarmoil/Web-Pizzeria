import './App.css';
import Layout from './components/Layout';
import FrontPage from './pages/FrontPage';
import ManagementPage from './pages/ManagementPage';
import Location from './components/Location';
import {Route, Routes} from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import MenuPage from './pages/menuPage';
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
