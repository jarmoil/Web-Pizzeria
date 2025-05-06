import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import {useCart} from '../context/CartContext';
import {useAuth} from '../hooks/useAuth';
import SignInButton from './user/SignInButton';
import CartButton from './cart/CartButton';
import LogoutButton from './user/LogoutButton';

const Layout = () => {
  const [isCartVisible, setCartVisible] = useState(false);
  const [isSignInVisible, setSignInVisible] = useState(false);

  const {cartCount} = useCart();
  const {user, role} = useAuth();

  const toggleCart = () => setCartVisible(!isCartVisible);
  const toggleSignIn = () => setSignInVisible(!isSignInVisible);

  return (
    <div>
      <header>
        <nav>
          <div id="logo">MyShop</div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            {user && (role === 'admin' || role === 'employee') && (
            <li>
              <Link to="/managementPage">Management Page</Link>
            </li>
            )}
            {user && (role === 'admin' || role === 'employee' || role === 'customer') && (
            <li>
              <Link to="/accountPage">Account Page</Link>
            </li>
            )}
            <li>
              <Link to="/location">Location</Link>
            </li>
          </ul>

          <div id="header-actions">
            <button id="cart-btn" onClick={toggleCart}>
              Cart
              <span id="cart-count">{cartCount}</span>
            </button>

            {user ? (
              <>
                <LogoutButton />
              </>
            ) : (
              <button id="signin-btn" onClick={toggleSignIn}>
                Sign In
              </button>
            )}
          </div>

          {!user && (
            <SignInButton isVisible={isSignInVisible} onClose={toggleSignIn} />
          )}
          <CartButton isVisible={isCartVisible} onClose={toggleCart} />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
