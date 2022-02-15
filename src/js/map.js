import leaflet from "leaflet"

let map = null
const initializingMap = _ => {
  if (map !== undefined && map !== null)
  map.remove();
}

export const displayWeatherMap = data => {
  initializingMap()

  map = leaflet.map('map').setView([data.lat, data.lon], 12);

  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  leaflet.marker([data.lat, data.lon]).addTo(map)

  return data
}
