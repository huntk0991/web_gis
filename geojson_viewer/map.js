var map = L.map('map').setView([71.505, 28.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('sample.geojson')
    .then(response => (response.json()))
    .then(data=>{
        const geojson_layer=L.geoJSON(data).addTo(map)
        map.fitBounds(geojson_layer.getBounds())
    });

