import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
// import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router';
import {CartProvider} from './context/CartContext.jsx';
import {AuthProvider} from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
