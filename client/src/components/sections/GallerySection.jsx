const GallerySection = () => {
    return (
      <section id="homepage-gallery" className="homepage-section">
        <h2>Kuvagalleria</h2>
        <div className="homepage-gallery-grid">
          <div className="homepage-gallery-column">
            <img src="/images/galleria-kuva1.jpg" alt="Pizza dough" />
            <img src="/images/galleria-kuva2.jpg" alt="Pepperoni pizza" />
          </div>
          <div className="homepage-gallery-column">
            <img src="/images/galleria-kuva3.jpg" alt="Pizza slice" />
            <img src="/images/galleria-kuva4.jpg" alt="Fresh ingredients" />
          </div>
          <div className="homepage-gallery-column">
            <img src="/images/galleria-kuva5.jpg" alt="Restaurant glasses" />
            <img src="/images/galleria-kuva6.jpg" alt="Viiksivallu" />
          </div>
        </div>
      </section>
    );
  };

  export default GallerySection;
