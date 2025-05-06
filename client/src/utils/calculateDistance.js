/**
 * Calculates the distance between two geographical points using the Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first point in decimal degrees.
 * @param {number} lon1 - The longitude of the first point in decimal degrees.
 * @param {number} lat2 - The latitude of the second point in decimal degrees.
 * @param {number} lon2 - The longitude of the second point in decimal degrees.
 * @returns {number} The distance between the two points in kilometers.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
