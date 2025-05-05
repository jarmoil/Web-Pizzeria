import { useState } from 'react';
import { handleRegistration } from '../../services/registerLogic';


const SignUp = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    psw: '',
    pswRepeat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegistration(formData); // Call the external logic
  };

  return (

    <section id="signUp-section">
      <form onSubmit={handleSubmit}>
        <div className="signUp-container">
          <h1 id="signUp-container-h1">Register</h1>
          <p id="signUp-container-p">
            Please fill in this form to create an account.
          </p>
          <hr id="signUp-container-hr" />

          <label id="signUp-container-label" htmlFor="user_name"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="user_name"
            id="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />

          <label id="signUp-container-label" htmlFor="email"><b>Email</b></label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label id="signUp-container-label" htmlFor="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            value={formData.psw}
            onChange={handleChange}
            required
          />

          <label id="signUp-container-label" htmlFor="psw-repeat"><b>Repeat Password</b></label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="pswRepeat"
            id="psw-repeat"
            value={formData.pswRepeat}
            onChange={handleChange}
            required
          />

          <p id="signUp-container-terms-privacy">
            By creating an account you agree to our
            <a id="signUp-container-terms-privacy-a" href="#">Terms & Privacy</a>.
          </p>
          <button type="submit" className="signUp-container-registerbtn">
            Register
          </button>
        </div>

        <div className="signUp-container-signIn-container">
          <p id="signUp-container-signIn-container-p">
            Already have an account?
            <a id="signUp-container-signIn-container-a" href="signin.html">Sign in</a>.
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
