// Muokattu, näyttää back endin errorit nyt

export const fetchData = async (url, options = {}) => {
  const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/'
      : import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + url;

  const response = await fetch(fullUrl, options);
  const json = await response.json();

  if (!response.ok) {
    console.error('API error:', fullUrl, json);
    throw new Error(
      json.message
        ? `${json.message}, koodi:${response.status}`
        : `Error ${response.status}`
    );
  }

  return json;
};
