import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
        <div className="homepage">
            <div className="homepage-body">



                <main id="homepage-main-wrapper">
                <section id="homepage-hero" className="homepage-section">
                    <div className="homepage-hero-content">
                    <h1>Tervetuloa Pápán Pizzeriaan!</h1>
                    <p>Herkullista pizzaa vuodesta 2001 asti</p>
                    <Link to="/menu" className="homepage-menu-button">Katso menu</Link>
                    </div>
                </section>

                <section id="homepage-about" className="homepage-section">
                    <div className="homepage-about-grid">
                    <div className="homepage-about-text">
                        <h2>Meidän taustamme</h2>
                        <p>
                        Olemme tehneet käsintehtyjä pizzoja kotimaisilla aineksilla
                        vuodesta....
                        </p>
                    </div>
                    <div className="homepage-about-image">
                        <img src="/images/pizza-oven.jpg" alt="Pizza oven" />
                    </div>
                    </div>
                </section>

                <section id="homepage-featured-pizza" className="homepage-section">
                    <h2>Viikon pizza</h2>
                    <div className="homepage-featured-grid">

                    <div className="homepage-pizza-card">
                        <img
                        src="/images/margerita-pizza.jpg"
                        alt="Featured pizza"
                        />
                        <h3 id="homepage-featured-pizza-name">Margherita</h3>
                        <p id="homepage-featured-pizza-description">
                        Perinteinen pizza, jossa on tomaattikastiketta, mozzarella-juustoa
                        ja tuoretta basilikaa.
                        </p>
                        <p id="homepage-featured-pizza-rating">⭐ 4.8 / 5</p>
                    </div>
                    </div>
                </section>

                <section id="homepage-ratings" className="homepage-section">
                    <h2>Asiakkaiden arvostelut</h2>
                    <div className="homepage-review-form">
                    <h3>Jätä ravintola-arvostelu</h3>
                    <form className="homepage-review-form-content">
                    <textarea maxLength="500" rows="4" required></textarea>
                        <button type="submit" className="homepage-review-submit-btn">
                        Lähetä arvostelu
                        </button>
                    </form>
                    </div>
                    <div className="homepage-ratings-controls">
                    <label htmlFor="homepage-ratings-sort">Suodata:</label>
                    <select id="homepage-ratings-sort" name="sort">
                        <option value="newest">Uusimmat</option>
                        <option value="most-liked">Suosituimmat</option>
                        <option value="oldest">Vanhimmat</option>
                    </select>
                    </div>

                    <div className="homepage-ratings-scroll">

                    <div className="homepage-rating-card">
                        <p className="homepage-rating-card-text">
                        "Pizza oli todella herkullista ja palvelu oli erinomaista!"
                        </p>
                        <div className="homepage-rating-meta">
                        <span className="homepage-rating-user">- Anna</span>
                        <button
                            className="homepage-rating-like-btn"
                            aria-label="Like this review"
                        >
                            <span className="like-emoji">👍</span>
                            <span className="like-count">12</span>
                        </button>
                        <span className="homepage-rating-date">2025-04-03</span>
                        </div>
                    </div>

                    <div className="homepage-rating-card">
                        <p className="homepage-rating-card-text">
                        "Pizza oli todella herkullista ja palvelu oli erinomaista!"
                        </p>
                        <div className="homepage-rating-meta">
                        <span className="homepage-rating-user">- Anna</span>
                        <button
                            className="homepage-rating-like-btn"
                            aria-label="Like this review"
                        >
                            <span className="like-emoji">👍</span>
                            <span className="like-count">12</span>
                        </button>
                        <span className="homepage-rating-date">2025-04-03</span>
                        </div>
                    </div>

                    <div className="homepage-rating-card">
                        <p className="homepage-rating-card-text">
                        "Pizza oli todella herkullista ja palvelu oli erinomaista!"
                        </p>
                        <div className="homepage-rating-meta">
                        <span className="homepage-rating-user">- Anna</span>
                        <button
                            className="homepage-rating-like-btn"
                            aria-label="Like this review"
                        >
                            <span className="like-emoji">👍</span>
                            <span className="like-count">12</span>
                        </button>
                        <span className="homepage-rating-date">2025-04-03</span>
                        </div>
                    </div>

                    </div>
                </section>

                <section id="homepage-gallery" className="homepage-section">
                    <h2>Kuvagalleria</h2>
                    <div className="homepage-gallery-grid">
                    <div className="homepage-gallery-column">
                        <img
                        src="/images/galleria-kuva1.jpg"
                        alt="Pizza dough"
                        />
                        <img
                        src="/images/galleria-kuva2.jpg"
                        alt="Pepperoni pizza"
                        />
                    </div>
                    <div className="homepage-gallery-column">
                        <img
                        src="/images/galleria-kuva3.jpg"
                        alt="Pizza slice"
                        />
                        <img
                        src="/images/galleria-kuva4.jpg"
                        alt="Fresh ingredients"
                        />
                    </div>
                    <div className="homepage-gallery-column">
                        <img
                        src="/images/galleria-kuva5.jpg"
                        alt="Restaurant glasses"
                        />
                        <img
                        src="/images/galleria-kuva6.jpg"
                        alt="Viiksivallu"
                        />
                    </div>
                    </div>
                </section>

                <section id="homepage-hours-location" className="homepage-section">
                    <div className="homepage-hours-location-grid">
                    <div className="homepage-hours">
                        <h3>Aukioloajat</h3>
                        <ul>
                        <li>Ma-Pe: 11:00 - 22:00</li>
                        <li>La: 12:00 - 23:00</li>
                        <li>Su: 12:00 - 21:00</li>
                        </ul>
                    </div>
                    <div className="homepage-map">
                        <h3>Osoite</h3>
                        <p>
                        Pápán Pizzeria, Helsinginkatu 1<br />
                        00010, Helsinki<br />FIN
                        </p>
                        <div id="map"></div>
                    </div>
                    </div>
                </section>
                </main>

                <footer>
                    <div className="footer-container">
                        <div className="about-us-container">
                        <h2 className="footer-h2">About Us</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                            incidunt ratione quia? Mollitia, explicabo, error quae non dolorem
                            nulla reiciendis molestiae exercitationem accusamus, quasi id omnis
                            voluptate debitis voluptatibus quam.
                        </p>
                        <ul className="footer-ul">
                            <li>
                            <a href="https://www.facebook.com"
                                ><i className="fa fa-facebook" aria-hidden="true"></i
                            ></a>
                            </li>
                            <li>
                            <a href="https://x.com"
                                ><i className="fa fa-twitter" aria-hidden="true"></i
                            ></a>
                            </li>
                            <li>
                            <a href="https://www.instagram.com"
                                ><i className="fa fa-instagram" aria-hidden="true"></i
                            ></a>
                            </li>
                            <li>
                            <a href="https://www.youtube.com"
                                ><i className="fa fa-youtube-play" aria-hidden="true"></i
                            ></a>
                            </li>
                        </ul>
                        </div>
                        <div className="quicklink-container">
                        <h2>Quick Links</h2>
                        <ul className="quicklink-ul">
                            <li><a href="#">About</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Help</a></li>
                            <li><a href="#">Terms $ Conditions</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                        </div>
                        <div className="Shop-container">
                        <h2>Shop</h2>
                        <ul className="shop-ul">
                            <li><a href="#">Menu</a></li>
                            <li>
                            <a href="https://maps.app.goo.gl/wQysyjJVeuQwDkeS6">Kartta</a>
                            </li>
                            <li><a href="#">lorem</a></li>
                            <li><a href="#">lorem</a></li>
                        </ul>
                        </div>
                        <div className="contact-container">
                        <h2>Contact Us</h2>
                        <ul className="info">
                            <li>
                            <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                            <a href="https://maps.app.goo.gl/wQysyjJVeuQwDkeS6"
                                >Helsinginkatu 1<br />
                                00010, Helsinki<br />FIN</a
                            >
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
            </div>
        </div>
    </>
  )
};

export default Home;
