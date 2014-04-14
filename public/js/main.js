 var map = L.mapbox.map('map', 'gfpk.hplpkmo7').setView([ 53.9, -6],12);

/*var layer = L.mapbox.tileLayer('gfpk.map-z6zqpvk6')
    // since layers load asynchronously through AJAX, use the
    // `.on` function to listen for them to be loaded before
    // calling `getTileJSON()`
    .on('load', function() {
    // get TileJSON data from the loaded layer
    var TileJSON = layer.getTileJSON();
});*/

L.mapbox.featureLayer({
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [-6, 53.9]
    },
    properties: {
        title: 'A Single Marker',
        description: 'Just one of me',
        // one can customize markers by adding simplestyle properties
        // http://mapbox.com/developers/simplestyle/
        'marker-size': 'large',
        'marker-color': '#D64937'
    }
}).addTo(map);
