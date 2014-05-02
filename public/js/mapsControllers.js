var mapsControllers = angular.module('MapsControllers', []);

var localstorage = {
    set: function (key, value) {
        window.localStorage.setItem( key, JSON.stringify(value) );
    },
    get: function (key) {
        try {
            return JSON.parse( window.localStorage.getItem(key) );
        } catch (e) {
            return null;
        }
    }
};

var storagekey = 'fitMapData';
var resourceURL = '/json/maps.json';
var localMapData = localstorage.get(storagekey);
var mapboxId = "gfpk.map-z6zqpvk6";


//local storage helper


mapsControllers.controller('MapListCtrl', ['$scope', '$http','$timeout',
		function ($scope, $http, $timeout) {

			$scope.maps=[];

			if(localMapData){
				$scope.maps = localMapData;	
				 angular.element(document).ready(function () {
				        $scope.rendermaps();
				    });
			}else{
				$http.get(resourceURL).success(function(data) {
					$scope.maps = data;
					localstorage.set(storagekey, data);
					console.log($scope.maps);
					 angular.element(document).ready(function () {
				        $scope.rendermaps();
				    });
				});
			}
	
			$scope.rendermaps = function(){

		        var arr = ($scope.maps);

		        for(var i =0;i<arr.length;i++){
		        	var elId ="map-" + String(i); 	
		        
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
		       
		    };
		   
				   
				
	
}]);

mapsControllers.controller('SinglePhoneCtrl', ['$scope', '$routeParams', '$http','$timeout',
	function($scope, $routeParams, $http, $timeout) {

		//variables
		$scope.maps=[];
		$scope.map ={};

		

		
		if(localMapData && localMapData[$routeParams.mapNo]){
			$scope.map = localMapData[$routeParams.mapNo];//handling localstorage mapdata
			$scope.maps = localMapData;
		angular.element(document).ready(function () {
		        $scope.rendermap();	 
		              
			});		
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.maps = data; //mapdata if localstorage empty
				$scope.map = data[$routeParams.mapNo];
				angular.element(document).ready(function () {
			        $scope.rendermap();	
			               
				});
				localstorage.set('fitMapData', $scope.maps);
			});
		}


		//functions
		$scope.savechanges = function(){
			localstorage.set(storagekey, $scope.maps);
		};

		$scope.drawline = function(){
				var points = [];
        		for(i=0;i<($scope.map.geoJSON.length);i++){
        			//val arr = [];
        			var val = [$scope.map.geoJSON[i].geometry.coordinates[1], $scope.map.geoJSON[i].geometry.coordinates[0]];

        			points.push(val);
        		}
        		//console.log(points);
        		var zeLines = L.mapbox.featureLayer().addTo(zeMap);
        		$scope.trail = L.polyline(points).addTo(zeLines);

		};

		$scope.rendermap = function(){	
			zeMap = L.mapbox.map ('map', mapboxId).setView($scope.map.geo.center, ($scope.map.geo.zoom + 1));
			if($scope.map.geoJSON){

				//console.log($scope.map.geoJSON.length);
        		zeMarkers = L.mapbox.featureLayer().addTo(zeMap);
				zeMarkers.setGeoJSON($scope.map.geoJSON); 

        	};
        	if($scope.map.trail){
        		
        		$scope.drawline();
        	}
		};
		

		$scope.markerOptions = {

			properties:{
				color:"f00",
			}
		};

		$scope.mapEditor = {
			addMarker:function(){

					$('#map').css('cursor', "crosshair");
				
				
				
								zeMap.on('click', function(e) {							
								    var latitude = e.latlng.lat;
								    var longitude = e.latlng.lng;
								    console.log($scope.markerOptions.properties);
								    var newmarker = {
										  "type": "Feature",
										  "geometry": {
											    "type": "Point",
											    "coordinates": [longitude, latitude]
											  }			
											};
									newmarker.properties ={
										"marker-color":$scope.markerOptions.properties.color,
									};
									console.log(newmarker);
								    $scope.maps[$routeParams.mapNo].geoJSON.push(newmarker);
								    //L.marker([ latitude, longitude]).addTo(zeMarkers);
								    zeMarkers.setGeoJSON($scope.maps[$routeParams.mapNo].geoJSON);
				
								    if(zeMarkers._geojson.length>0){
								  		
								  		$scope.map.trail = true;
								    	$scope.trail.addLatLng([ latitude, longitude] );
				
								    }
				
								    $scope.savechanges();
								});

			},
			removeMarkers :function(){
				
				
				$scope.trail._latlangs = [];
				


				 $scope.maps[$routeParams.mapNo].geoJSON = [];
				
				zeMarkers.setGeoJSON($scope.maps[$routeParams.mapNo].geoJSON);
				zeMap.removeLayer($scope.trail);
				
				
				
				
				$scope.drawline();


				$scope.savechanges();

				
			},
			stepBack:function(){

				var geo = $scope.map.geoJSON;
				console.log(geo[(geo.length-1)]);
				geo.pop(geo.length-1);

				zeMarkers.setGeoJSON(geo);
				zeMap.removeLayer($scope.trail);
				zeLines = L.mapbox.featureLayer().addTo(zeMap);

				$scope.drawline();
				$scope.savechanges();
				



			},
 






		};

		
		

		
	
		
}]);
