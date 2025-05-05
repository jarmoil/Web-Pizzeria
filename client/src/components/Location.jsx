const Location = () => {
    return (
      <div className="location-page">
        <h1>Sijaintimme</h1>
        <p>Helsinginkatu 1 00010, Helsinki</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.048972743524!2d24.957291!3d60.1878327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692097f25bcfa85%3A0x5fe2e21dfa1f3b95!2sHelsinginkatu%201%2C%2000500%20Helsinki%2C%20Finland!5e0!3m2!1sen!2sfi!4v1680000000000!5m2!1sen!2sfi"
        width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    );
  };

  export default Location;
