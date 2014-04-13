var map = L.mapbox.map('map', 'gfpk.hpghk38p');
var layer = L.mapbox.tileLayer('gfpk.hpglcc1h');
layer.on('ready', function() {
  // the layer has been fully loaded now, and you can
  // call .getTileJSON and investigate its properties
});

