const apiKey = import.meta.env.VITE_HSL_API_KEY;

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
