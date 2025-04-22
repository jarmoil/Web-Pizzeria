import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return(
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
                        <li>
                            <Link to="/managementPage">Management Page</Link>
                        </li>
                        <li>
                            <Link to="/location">Location</Link>
                        </li>
                    </ul>

                    {/* <nav id="main-nav">
                        <a id="home-link" href="./homepage.html">Home</a>
                        <a id="shop-link" href="./menu.html">Menu</a>
                        <a id="managementPage-link" href="./managementPage.html"
                        >Management Page</a>
                        <a id="location-link" href="#homepage-hours-location">Location</a>
                    </nav> */}

                    <div id="header-actions">
                        <button id="cart-btn">
                        Cart
                        <span id="cart-count">3</span>
                        </button>
                        <button id="signin-btn">Sign In</button>
                    </div>
                    <div id="signin-modal" className="modal-overlay hidden">
                        <div id="signin-box" className="modal-box">
                            <button id="signin-close" className="close-btn">&times;</button>
                            <div id="signin-heading">
                                <span>Sign In</span>
                            </div>
                            <input id="signin-email" type="email" placeholder="Email" />
                            <input id="signin-password" type="password" placeholder="Password" />
                            <div className="remember-forgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="forgotPassword.html">Forgot Password?</a>
                            </div>
                            <button id="signin-submit-btn">Login</button>
                            <p>
                            Don't have an account?
                            <button id="signup-btn">Sign Up</button>
                            </p>
                        </div>
                    </div>

                <div id="cart-dropdown" className="cart-dropdown hidden">
                    <div id="cart-box">
                        <button id="cart-close" className="close-btn">&times;</button>
                        <h2>Your Cart</h2>
                        <ul id="cart-items">
                            <li id="cart-item1"><span>Item 1</span><span>$10</span></li>
                            <li id="cart-item2"><span>Item 2</span><span>$15</span></li>
                        </ul>
                        <div id="cart-total"><span>Total:</span><span>$25</span></div>
                        <button id="cart-checkout-btn">Checkout</button>
                    </div>
                </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;
