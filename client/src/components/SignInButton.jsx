import { useNavigate } from "react-router-dom";

const SignInButton = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/forgotPassword"); // Redirect to the ForgotPassword route
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the SignUp route
  };

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
            <button
              type="button"
              className="forgot-password-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <button id="signin-submit-btn">Login</button>
          <p>
            Don't have an account?
            <button type="button"
            className="signup-btn"
            onClick={handleSignUp}>Sign Up</button>
          </p>
        </div>
      </div>
    )
  );
};

export default SignInButton;
