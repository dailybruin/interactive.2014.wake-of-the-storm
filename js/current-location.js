$(document).ready(function(){
    L.mapbox.accessToken = "pk.eyJ1IjoiZGJvbmxpbmUiLCJhIjoiNmtQLUNuVSJ9.NH129qs3Mu-tWPspZuuOuQ"
    window.map = L.mapbox.map('current-location-map', 'dbonline.jea97dih');
    map.on('ready', function(){
        map.setView([14.083, 124.239], 6)
    });
});
