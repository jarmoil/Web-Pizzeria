/**
 * ForgotPassword component for displaying a password recovery form.
 * Allows users to input their email address to request a password reset.
 * Currently, the functionality is not implemented and shows an alert.
 *
 * @returns {JSX.Element} The "Forgot Password" section with a form and a button.
 */
const forgotPassword = () => {
  return (
    <section id="forgotPassword-section">
      <div className="forgotPassword-container">
        <form action="">
          <h2 id="forgotPassword-container-h2">Forgot Password?</h2>
          <div className="forgotPassword-input-container">
            <p id="forgotPassword-input-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. illo vel
              ut reprehenderit vero modi dolores incidunt soluta beatae.
            </p>
            <label id="forgotPassword-input-label">Email</label>
            <input
              id="forgotPassword-input-input"
              type="inputEmailText"
              placeholder="Enter Email"
              required
            />
          </div>
        </form>
        <button
          href="#"
          className="forgotPassword-send-new-password-button"
          onClick={() => alert('This feature is coming later!')}
        >
          Send new password
        </button>
      </div>
    </section>
  );
}

export default forgotPassword;
