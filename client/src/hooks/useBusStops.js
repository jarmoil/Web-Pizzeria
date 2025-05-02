import {useState, useEffect} from 'react';
import {fetchBusStops} from '../services/hslService.js';

const useBusStops = (lat, lon, radius = 100) => {
  const [busStops, setBusStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const stopsData = await fetchBusStops(lat, lon, radius);

        const parsedStops = stopsData.map(({node}) => ({
          name: node.stop.name,
          vehicleMode: node.stop.vehicleMode,
          code: node.stop.code,
          lat: node.stop.lat,
          lon: node.stop.lon,
          distance: node.distance,
        }));

        setBusStops(parsedStops);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch bus stops');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon, radius]);

  return {busStops, loading, error};
};

export default useBusStops;
