import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useBusStops from '../hooks/useBusStops';
import {useEffect, useState} from 'react';
import {calculateDistance} from '../utils/calculateDistance';

const busStopIcon = new L.Icon({
  iconUrl: '../../public/images/stop.svg',
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

const MyMapComponent = () => {
  const [distance, setDistance] = useState(null);
  const restaurantLocation = [60.18789408213458, 24.959844440006883]; // Restaurant coordinates

  const {busStops, loading, error} = useBusStops(
    restaurantLocation[0],
    restaurantLocation[1],
    300
  );

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
