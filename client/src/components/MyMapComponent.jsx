import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useBusStops from '../hooks/useBusStops';
import {useEffect, useState} from 'react';
import {calculateDistance} from '../utils/calculateDistance';

/**
 * Custom Leaflet icon for bus stops.
 * @constant
 * @type {L.Icon}
 */
const busStopIcon = new L.Icon({
  iconUrl: 'images/stop.svg',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// Fix for default marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/**
 * MyMapComponent component for displaying a map with the restaurant's location and nearby bus stops.
 * Calculates the user's distance to the restaurant and displays it in a popup.
 *
 * @returns {JSX.Element} A map with the restaurant's location, nearby bus stops, and distance information.
 */
const MyMapComponent = () => {
    /**
   * State for storing the calculated distance from the user to the restaurant.
   * @type {string|null}
   */
  const [distance, setDistance] = useState(null);

  /**
   * Coordinates of the restaurant.
   * @constant
   * @type {number[]}
   */
  const restaurantLocation = [60.18789408213458, 24.959844440006883]; // Restaurant coordinates

  /**
   * Fetches nearby bus stops using the `useBusStops` hook.
   * @type {Object}
   * @property {Object[]} busStops - Array of nearby bus stops.
   * @property {boolean} loading - Indicates if the bus stops are being loaded.
   * @property {string|null} error - Error message if loading fails.
   */
  const {busStops, loading, error} = useBusStops(
    restaurantLocation[0],
    restaurantLocation[1],
    300
  );

  /**
   * Calculates the distance between the user's location and the restaurant.
   * Uses the browser's geolocation API to get the user's coordinates.
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          // Calculate the distance
          const dist = calculateDistance(
            userLat,
            userLon,
            restaurantLocation[0],
            restaurantLocation[1]
          );
          setDistance(dist.toFixed(2)); // Round to 2 decimal places
        },
        (error) => {
          console.error('Error getting location:', error);
          setDistance('Unable to determine location');
        }
      );
    } else {
      setDistance('Geolocation not supported');
    }
  }, []);

  return (
    <MapContainer
      center={restaurantLocation}
      zoom={15}
      style={{height: '300px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={restaurantLocation}>
        <Popup>
          <div>
            <strong>Pápán Pizzeria</strong>
            <br />
            Helsinginkatu 1<br />
            00010, Helsinki
            <br />
            FIN
            <br />
            {distance !== null ? (
              <span>Distance: {distance} km</span>
            ) : (
              <span>Calculating distance...</span>
            )}
          </div>
        </Popup>
      </Marker>

      {/* Show loading/error or bus stops */}
      {loading && <div>Loading bus stops...</div>}
      {error && <div>{error}</div>}
      {!loading &&
        busStops.length > 0 &&
        busStops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.lat, stop.lon]}
            icon={busStopIcon}
          >
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              Code: {stop.code}
              <br />
              Distance: {stop.distance} meters
              <br />
              Vehicle: {stop.vehicleMode}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MyMapComponent;
