import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
// import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router';
import {CartProvider} from './context/CartContext.jsx';
import {AuthProvider} from './context/AuthContext.jsx';

/**
 * The entry point of the application.
 * Renders the root component (`App`) into the DOM.
 * Wraps the application with `BrowserRouter` for routing, `AuthProvider` for authentication context,
 * and `CartProvider` for cart management context.
 */
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
