import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

const SignInButton = ({isVisible, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, loading} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({email, password});
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    isVisible && (
      <div id="signin-modal" className="signin-modal">
        <div id="signin-box" className="signin-box">
          <button id="signin-close" className="close-btn" onClick={onClose}>
            &times;
          </button>
            <h2 id="signin-heading">Sign In</h2>
            <form id="signin-form" class="signin-form">
              <input
                id="signin-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="signin-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <button
                type="button"
                className="forgot-password-btn"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          <button
            id="signin-submit-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="signin-footer">
            Don't have an account?
            <span className="signup-container">
              <button type="button" className="signup-btn" onClick={handleSignUp}>
                Sign Up
              </button>
            </span>
          </p>
        </div>
      </div>
    )
  );
};

export default SignInButton;
