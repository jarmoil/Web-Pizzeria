import { Link } from "react-router-dom";

/**
 * SocialLink component for rendering a social media link.
 *
 * @param {Object} props - Component props.
 * @param {string} props.href - The URL of the social media page.
 * @param {string} props.icon - The icon class for the social media platform.
 * @returns {JSX.Element} A list item containing a social media link.
 */
const SocialLink = ({ href, icon }) => (
  <li>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <i className={`fab ${icon}`} aria-hidden="true"></i>
    </a>
  </li>
);

/**
 * Footer component for displaying the footer section of the website.
 * Includes sections for "About Us," "Quick Links," "Shop," and "Contact Us."
 *
 * @returns {JSX.Element} The footer section of the website.
 */
const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          {/* About Us Section */}
          <div className="about-us-container">
            <h2 className="footer-h2">About Us</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut incidunt ratione quia? Mollitia, explicabo, error quae non dolorem nulla reiciendis molestiae exercitationem accusamus, quasi id omnis voluptate debitis voluptatibus quam.
            </p>
            <ul className="footer-ul">
              <SocialLink href="https://www.facebook.com" icon="fa-facebook" />
              <SocialLink href="https://x.com" icon="fa-twitter" />
              <SocialLink href="https://www.instagram.com" icon="fa-instagram" />
              <SocialLink href="https://www.youtube.com" icon="fa-youtube" />
              <SocialLink href="https://www.linkedin.com" icon="fa-linkedin" />
              <SocialLink href="https://www.tiktok.com" icon="fa-tiktok" />
              <SocialLink href="https://www.pinterest.com" icon="fa-pinterest" />
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="quicklink-container">
            <h2>Quick Links</h2>
            <ul className="quicklink-ul">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="shop-container">
            <h2>Shop</h2>
            <ul className="shop-ul">
              <li><Link to="/menu">Menu</Link></li>
              <li>
                <a href="https://maps.app.goo.gl/wQysyjJVeuQwDkeS6" target="_blank" rel="noopener noreferrer">Kartta</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-container">
            <h2>Contact Us</h2>
            <ul className="info">
              <li>
                <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                <a href="https://maps.app.goo.gl/wQysyjJVeuQwDkeS6" target="_blank" rel="noopener noreferrer">
                  Helsinginkatu 1<br />
                  00010, Helsinki<br />FIN
                </a>
              </li>
              <li>
                <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                <p>
                  <a href="tel:+358123123123">+358 123 123 123</a><br />
                  <a href="tel:+358123123123">+358 123 123 123</a>
                </p>
              </li>
              <li>
                <span><i className="fa fa-envelope" aria-hidden="true"></i></span>
                <p><a href="mailto:Papas@pizzeria.com">Papas@pizzeria.com</a></p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
