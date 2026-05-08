const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 22,
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);

fetch('http://127.0.0.1:8000/survey')
    .then(response => response.json())
    .then(data => {
        console.log("GeoJSON loaded:", data);
        console.log("Feature count:", data.features.length);

        const surveyLayer = L.geoJSON(data, {
            style: {
                color: "red",
                weight: 3,
                fillColor: "yellow",
                fillOpacity: 0.5
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Polygon loaded");
            }
        }).addTo(map);

        console.log("Bounds:", surveyLayer.getBounds());

        map.fitBounds(surveyLayer.getBounds());
    })
    .catch(error => console.error("Error:", error));