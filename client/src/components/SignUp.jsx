const SignUp = () => {
    return (
        <section id="signUp-section">
      <form action="">
        <div className="signUp-container">
          <h1 id="signUp-container-h1">Register</h1>
          <p id="signUp-container-p">
            Please fill in this form to create an account.
          </p>
          <hr id="signUp-container-hr" />

          <label id="signUp-container-label" htmlFor="email"><b>Email</b></label>
          <input
            type="emailtext"
            placeholder="Enter Email"
            name="email"
            id="email"
            required
          />

          <label id="signUp-container-label" htmlFor="psw"><b>Password</b></label>
          <input
            type="passwordtext"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />

          <label id="signUp-container-label" htmlFor="psw-repeat"
            ><b>Repeat Password</b></label
          >
          <input
            type="passwordtext"
            placeholder="Repeat Password"
            name="psw-repeat"
            id="psw-repeat"
            required
          />
          <hr />

          <p id="signUp-container-terms-privacy">
            By creating an account you agree to our
            <a id="signUp-container-terms-privacy-a" href="#">Terms & Privacy</a
            >.
          </p>
          <button type="submit" className="signUp-container-registerbtn">
            Register
          </button>
        </div>

        <div className="signUp-container-signIn-container">
          <p id="signUp-container-signIn-container-p">
            Already have an account?
            <a id="signUp-container-signIn-container-a" href="signin.html"
              >Sign in</a
            >.
          </p>
        </div>
      </form>
    </section>
    )
}

export default SignUp;
