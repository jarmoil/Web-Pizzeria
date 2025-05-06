const apiKey = import.meta.env.VITE_HSL_API_KEY;

/**
 * Fetches nearby bus stops based on latitude, longitude, and radius using the HSL API.
 *
 * @param {number} lat - The latitude of the location to search for bus stops.
 * @param {number} lon - The longitude of the location to search for bus stops.
 * @param {number} [radius=100] - The radius (in meters) within which to search for bus stops.
 * @returns {Promise<Object[]>} A promise that resolves to an array of bus stop objects.
 * Each object contains:
 * - `stop` {Object}: Details about the bus stop.
 *   - `gtfsId` {string}: The GTFS ID of the bus stop.
 *   - `name` {string}: The name of the bus stop.
 *   - `vehicleMode` {string}: The mode of transportation (e.g., bus, tram).
 *   - `code` {string}: The code of the bus stop.
 *   - `lat` {number}: The latitude of the bus stop.
 *   - `lon` {number}: The longitude of the bus stop.
 * - `distance` {number}: The distance (in meters) from the specified location to the bus stop.
 * @throws {Error} If the API request fails or returns an invalid response.
 */
const fetchBusStops = async (lat, lon, radius = 100) => {
  const query = `
    {
      stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${radius}) {
        edges {
          node {
            stop {
              gtfsId
              name
              vehicleMode
              code
              lat
              lon
            }
            distance
          }
        }
      }
    }
  `;

  const response = await fetch(
    'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': apiKey,
      },
      body: JSON.stringify({query}),
    }
  );

  const result = await response.json();
  console.log(result);
  return result.data?.stopsByRadius?.edges || [];
};

export {fetchBusStops};
