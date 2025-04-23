const RatingsSection = () => {
    return (
      <section id="homepage-ratings" className="homepage-section">
        <h2>Asiakkaiden arvostelut</h2>
        <div className="homepage-review-form">
          <h3>Jätä ravintola-arvostelu</h3>
          <form className="homepage-review-form-content">
            <textarea maxLength="500" rows="4" required></textarea>
            <button type="submit" className="homepage-review-submit-btn">Lähetä arvostelu</button>
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
              <button className="homepage-rating-like-btn" aria-label="Like this review">
                <span className="like-emoji">👍</span>
                <span className="like-count">12</span>
              </button>
              <span className="homepage-rating-date">2025-04-03</span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default RatingsSection;
