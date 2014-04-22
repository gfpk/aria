var mapsControllers = angular.module('MapsControllers', []);


mapsControllers.controller('MapListCtrl', ['$scope', '$http','$timeout',
		function ($scope, $http, $timeout) {
			$http.get('http://127.0.0.1:3000/json/maps.json').success(function(data) {
				$scope.maps = data;
				$scope.rendermaps = (function(){
			        var mapboxId = "gfpk.map-z6zqpvk6";
			        var arr = ($scope.maps);
			        for(var i =0;i<arr.length;i++){
			        	var elId ="map-" + String(i); 	
			        	//var elem = document.getElementById(elId);
			        	var mapData = arr[i];
			        	var zeMap = L.mapbox.map (elId, mapboxId).setView(mapData.geo.center, mapData.geo.zoom);
			        	zeMap.scrollWheelZoom.disable();
			        	if(mapData.geoJSON){

			        		var zeLayer = L.mapbox.featureLayer().addTo(zeMap);

							var feature = mapData.geoJSON

							zeLayer.setGeoJSON(feature);
							zeLayer.on('ready', function() {
							    zeMap.fitBounds(featureLayer.getBounds());
							});
			       			
			        	};

			        };
			       
			    });

				$timeout($scope.rendermaps);

				
	});

}]);

mapsControllers.controller('SinglePhoneCtrl', ['$scope', '$routeParams', '$http','$timeout',
	function($scope, $routeParams, $http, $timeout) {
		$http.get('http://127.0.0.1:3000/json/maps.json').success(function(data) {

			
			if(localStorage.getItem('singlemapdata'+ $routeParams.mapNo)){
				
				$scope.singlemapdata = JSON.parse(localStorage.getItem('singlemapdata'+ $routeParams.mapNo));
				console.log(typeof($scope.singlemapdata.geoJSON))
			}else{
				$scope.singlemapdata = data[$routeParams.mapNo];
				console.log(typeof($scope.singlemapdata.geoJSON))
				
			};
			$scope.rendermap = function(){
				var mapboxId = "gfpk.map-z6zqpvk6";
				zeMap = L.mapbox.map ('map', mapboxId).setView($scope.singlemapdata.geo.center, ($scope.singlemapdata.geo.zoom + 1));
				if($scope.singlemapdata.geoJSON){
							console.log($scope.singlemapdata.geoJSON.length);
			        		zeLayer = L.mapbox.featureLayer().addTo(zeMap);
			        		

							zeLayer.setGeoJSON($scope.singlemapdata.geoJSON);
							
			       			
			        	}
			}
			$timeout($scope.rendermap);
			$scope.addMarker = function(){
				$('*').css('cursor', "crosshair");
					//var zeMap = L.mapbox.map();
					zeMap.on('click', function(e) {
						
				    var latitude = e.latlng.lat;
				    var longitude = e.latlng.lng;
				    console.log(latitude + " - " + longitude);
				    L.marker([latitude, longitude],{"marker-color": "#ffc423"}).addTo(zeMap);
				    var newMarker = {};
				    newMarker = {
						  "type": "Feature",
						  "geometry": {
							    "type": "Point",
							    "coordinates": [longitude, latitude]
							  },
						  "properties": {
							    "name": "Default"


							  }
						},

					$scope.singlemapdata.geoJSON.push(newMarker);
				
					console.log($scope.singlemapdata.geoJSON);
					localStorage.setItem('singlemapdata'+ $routeParams.mapNo, JSON.stringify($scope.singlemapdata));

			    });

			};

			
		});

		//tabs
		$('.nav-tabs li a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});

		
}]);
