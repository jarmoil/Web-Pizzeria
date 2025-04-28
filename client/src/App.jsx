import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import ManagementPage from './components/ManagementPage';
import Location from './components/Location';
import {Route, Routes} from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import MenuPage from './pages/menuPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/managementPage" element={<ManagementPage />} />
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
    </div>
  );
}

export default App;
