const SignInButton = ({ isVisible, onClose }) => {
    return (
      isVisible && (
        <div id="signin-modal" className="modal-overlay">
          <div id="signin-box" className="modal-box">
            <button id="signin-close" className="close-btn" onClick={onClose}>
              &times;
            </button>
            <div id="signin-heading">
              <span>Sign In</span>
            </div>
            <input id="signin-email" type="email" placeholder="Email" />
            <input id="signin-password" type="password" placeholder="Password" />
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Remember me
              </label>
              <a href="forgotPassword.html">Forgot Password?</a>
            </div>
            <button id="signin-submit-btn">Login</button>
            <p>
              Don't have an account?
              <button id="signup-btn">Sign Up</button>
            </p>
          </div>
        </div>
      )
    );
  };

  export default SignInButton;
