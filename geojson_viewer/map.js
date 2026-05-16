// Create map
const map = L.map('map').setView([20, 78], 5);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON
fetch('sample.geojson')
    .then(response => response.json())
    .then(data => {

        console.log("GeoJSON loaded:", data);

        // Add GeoJSON layer
        const geojsonLayer = L.geoJSON(data, {

            style: {
                color: 'blue',
                weight: 2
            },

            onEachFeature: function(feature, layer) {

                // Popup with attributes
                if (feature.properties) {

                    let popupContent = "";

                    for (let key in feature.properties) {
                        popupContent += `<b>${key}</b>: ${feature.properties[key]}<br>`;
                    }

                    layer.bindPopup(popupContent);
                }
            }

        }).addTo(map);

        // Zoom to GeoJSON
        map.fitBounds(geojsonLayer.getBounds());

    })
    .catch(error => {
        console.error("Error loading GeoJSON:", error);
    });