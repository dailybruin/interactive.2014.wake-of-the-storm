---
---
var CURRENT_MARKER_COLOR = "#f86767";
$(document).ready(function(){
    L.mapbox.accessToken = "pk.eyJ1IjoiZGJvbmxpbmUiLCJhIjoiNmtQLUNuVSJ9.NH129qs3Mu-tWPspZuuOuQ"
    window.map = L.mapbox.map('current-location-map', 'dbonline.jf680m39', {
        zoom: 6,
        center: [14.083, 124.239],
        worldCopyJump: true
    });
    window.featureLayer = L.mapbox.featureLayer()
        .addTo(map);

    featureLayer.on("layeradd", function(e) {
        try {
            var layer = e.layer;
            var props = e.layer.feature.properties;
            if (e.layer.feature.properties == undefined)
                return;
        } catch (err) {
            return;
        }
    });

    featureLayer.loadURL("{{site.url}}/assets/geo/current-location.geojson");
});
