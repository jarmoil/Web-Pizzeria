import {useState, useEffect} from 'react';
import {fetchBusStops} from '../services/hslService.js';

/**
 * Custom hook for fetching nearby bus stops based on latitude, longitude, and radius.
 * Provides a list of bus stops, loading state, and error messages.
 *
 * @param {number} lat - The latitude of the location to search for bus stops.
 * @param {number} lon - The longitude of the location to search for bus stops.
 * @param {number} [radius=100] - The radius (in meters) within which to search for bus stops.
 * @returns {Object} An object containing:
 * - `busStops` {Object[]}: An array of bus stop objects.
 *   - `name` {string}: The name of the bus stop.
 *   - `vehicleMode` {string}: The mode of transportation (e.g., bus, tram).
 *   - `code` {string}: The code of the bus stop.
 *   - `lat` {number}: The latitude of the bus stop.
 *   - `lon` {number}: The longitude of the bus stop.
 *   - `distance` {number}: The distance (in meters) from the specified location to the bus stop.
 * - `loading` {boolean}: Indicates whether the data is being loaded.
 * - `error` {string|null}: Error message if the data fetch fails.
 */
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
