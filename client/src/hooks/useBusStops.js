import {useState, useEffect} from 'react';
import {fetchBusStops} from '../services/hslService.js';

const useBusStops = (lat, lon, radius = 100) => {
  const [state, setState] = useState({
    busStops: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchData = async () => {
      setState((prev) => ({...prev, loading: true}));
      try {
        const stopsData = await fetchBusStops(lat, lon, radius);
        const parsedStops = stopsData.map(({node: {stop, distance}}) => ({
          name: stop.name,
          vehicleMode: stop.vehicleMode,
          code: stop.code,
          lat: stop.lat,
          lon: stop.lon,
          distance,
        }));
        setState({busStops: parsedStops, loading: false, error: null});
      } catch {
        setState((prev) => ({
          ...prev,
          error: 'Failed to fetch bus stops',
          loading: false,
        }));
      }
    };

    fetchData();
  }, [lat, lon, radius]);

  return state;
};

export default useBusStops;
