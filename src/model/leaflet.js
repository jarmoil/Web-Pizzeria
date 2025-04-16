var map = L.map('map').setView([60.18789408213458, 24.959844440006883], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([60.18789408213458, 24.959844440006883]).addTo(map);
