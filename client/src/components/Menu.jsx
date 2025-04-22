const Menu = () => {
    return (
        <main id="menu-main-wrapper">
      <section id="menu-wrapper" className="menu-wrapper-grid">
        <article className="menu-card" id="menu-card-1">
          <img
            src="/images/margerita-pizza.jpg"
            alt="Margerita pizza"
            className="menu-card-image"
          />

          <div className="menu-card-content">
            <h3 className="menu-card-title">Margherita</h3>
            <p className="menu-card-description">
              Tomaattikastike, mozzarella-juustoa ja tuoretta basilikaa.
            </p>
            <div className="menu-card-rating">
              <span className="menu-card-rating-stars">⭐ 4.5</span>
              <span className="menu-card-rating-count">(37 reviews)</span>
            </div>
            <div className="menu-card-price">8.90€</div>
            <button className="menu-card-button-add">Lisää ostoskoriin</button>
          </div>

          <button
            className="menu-card-button-reviews"
            data-modal-target="menu-modal-1"
          >
            Katso arvostelut
          </button>
        </article>

        <div className="menu-modal" id="menu-modal-1">
          <div className="menu-modal-content">
            <button className="menu-modal-close" aria-label="Sulje arvosteluikkuna">
              ×
            </button>
            <h2 className="menu-modal-title">Arvostelut: Margherita</h2>

            <div className="menu-review-form">
              <h3>Lisää arvostelu</h3>
              <form className="menu-review-form-content">
                <div className="menu-rating-input">
                  <label>Arvosana:</label>
                  <div className="menu-star-rating">
                    <input
                      type="radio"
                      id="menu-star-rating-star5"
                      name="rating"
                      value="5"
                    />
                    <label htmlFor="menu-star-rating-star5">★</label>
                    <input
                      type="radio"
                      id="menu-star-rating-star4"
                      name="rating"
                      value="4"
                    />
                    <label htmlFor="menu-star-rating-star4">★</label>
                    <input
                      type="radio"
                      id="menu-star-rating-star3"
                      name="rating"
                      value="3"
                    />
                    <label htmlFor="menu-star-rating-star3">★</label>
                    <input
                      type="radio"
                      id="menu-star-rating-star2"
                      name="rating"
                      value="2"
                    />
                    <label htmlFor="menu-star-rating-star2">★</label>
                    <input
                      type="radio"
                      id="menu-star-rating-star1"
                      name="rating"
                      value="1"
                    />
                    <label htmlFor="menu-star-rating-star1">★</label>
                  </div>
                </div>
                <textarea
                  placeholder="Kerro kokemuksestasi..."
                  maxLength="500"
                  rows="4"
                ></textarea>
                <button type="submit" className="menu-review-submit-btn">
                  Lähetä arvostelu
                </button>
              </form>
            </div>

            <div className="menu-modal-scroll">
              <div className="menu-review-card">
                <p className="menu-review-card-text">
                  "Pizza oli täydellistä! Tulee tilattua varmasti uudelleen."
                </p>
                <div className="menu-review-meta">
                  <span className="menu-review-user">– Markku</span>
                  <span className="menu-modal-review-rating">⭐ 4.5</span>
                  <span className="menu-review-date">2025-04-02</span>
                </div>
              </div>

              <div className="menu-review-card">
                <p className="menu-review-card-text">
                  "Hinta-laatusuhde kohdillaan. Mukava henkilökunta."
                </p>
                <div className="menu-review-meta">
                  <span className="menu-review-user">– Salla</span>
                  <span className="menu-modal-review-rating">⭐ 4.3</span>
                  <span className="menu-review-date">2025-03-28</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <article className="menu-card">
          <img
            src="/images/margerita-pizza.jpg"
            alt="Margerita pizza"
            className="menu-card-image"
          />

          <div className="menu-card-content">
            <h3 className="menu-card-title">Margherita</h3>
            <p className="menu-card-description">
              Tomaattikastike, mozzarella-juustoa ja tuoretta basilikaa.
            </p>

            <div className="menu-card-rating">
              <span className="menu-card-rating-stars">⭐ 4.5</span>
              <span className="menu-card-rating-count">(37 reviews)</span>
            </div>
            <div className="menu-card-price">8.90€</div>
            <button className="menu-card-button-add">Lisää ostoskoriin</button>
          </div>
        </article>

        <article className="menu-card">
          <img
            src="/images/margerita-pizza.jpg"
            alt="Margerita pizza"
            className="menu-card-image"
          />

          <div className="menu-card-content">
            <h3 className="menu-card-title">Margherita</h3>
            <p className="menu-card-description">
              Tomaattikastike, mozzarella-juustoa ja tuoretta basilikaa.
            </p>

            <div className="menu-card-rating">
              <span className="menu-card-rating-stars">⭐ 4.5</span>
              <span className="menu-card-rating-count">(37 reviews)</span>
            </div>
            <div className="menu-card-price">8.90€</div>
            <button className="menu-card-button-add">Lisää ostoskoriin</button>
          </div>
        </article>

        <article className="menu-card">
          <img
            src="/images/margerita-pizza.jpg"
            alt="Margerita pizza"
            className="menu-card-image"
          />

          <div className="menu-card-content">
            <h3 className="menu-card-title">Margherita</h3>
            <p className="menu-card-description">
              Tomaattikastike, mozzarella-juustoa ja tuoretta basilikaa.
            </p>

            <div className="menu-card-rating">
              <span className="menu-card-rating-stars">⭐ 4.5</span>
              <span className="menu-card-rating-count">(37 reviews)</span>
            </div>
            <div className="menu-card-price">8.90€</div>
            <button className="menu-card-button-add">Lisää ostoskoriin</button>
          </div>
        </article>

        <article className="menu-card">
          <img
            src="/images/margerita-pizza.jpg"
            alt="Margerita pizza"
            className="menu-card-image"
          />

          <div className="menu-card-content">
            <h3 className="menu-card-title">Margherita</h3>
            <p className="menu-card-description">
              Tomaattikastike, mozzarella-juustoa ja tuoretta basilikaa.
            </p>

            <div className="menu-card-rating">
              <span className="menu-card-rating-stars">⭐ 4.5</span>
              <span className="menu-card-rating-count">(37 reviews)</span>
            </div>
            <div className="menu-card-price">8.90€</div>
            <button className="menu-card-button-add">Lisää ostoskoriin</button>
          </div>
        </article>
      </section>
    </main>
    )
}

export default Menu;
