import MyMapComponent from "../MyMapComponent";

/**
 * HoursLocationSection component for displaying the pizzeria's hours and location.
 * Includes opening hours and a map showing the pizzeria's address.
 *
 * @returns {JSX.Element} The "Hours and Location" section of the homepage.
 */
const HoursLocationSection = () => {
    return (
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
            <MyMapComponent />
          </div>
        </div>
      </section>
    );
  };

  export default HoursLocationSection;
