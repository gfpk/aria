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

		$scope.maps=[];
		$scope.map ={};
		console.log($scope.map.geoJSON);
		if(localMapData && localMapData[$routeParams.mapNo]){
			$scope.map = localMapData[$routeParams.mapNo];
			$scope.maps = localMapData;
			console.log($scope.map);
			console.log($scope.maps);
			angular.element(document).ready(function () {
		        $scope.rendermap();
		        
			});
	

			
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.maps = data;
				$scope.map = data[$routeParams.mapNo];
				angular.element(document).ready(function () {
			        $scope.rendermap();			        
				});
				//localstorage.set('fitMapData', $scope.maps);
			});
		}

		$scope.savechanges = function(){
			localstorage.set(storagekey, $scope.maps);
			console.log($scope.maps[$routeParams.mapNo].geoJSON);
			
		};

		$scope.rendermap = function(){	
			zeMap = L.mapbox.map ('map', mapboxId).setView($scope.map.geo.center, ($scope.map.geo.zoom + 1));
			if($scope.map.geoJSON){
				//console.log($scope.map.geoJSON.length);
        		zeLayer = L.mapbox.featureLayer().addTo(zeMap);
				zeLayer.setGeoJSON($scope.map.geoJSON);    			
        	}
		};
		var newmarker = {

			  "type": "Feature",
			  "geometry": {
				    "type": "Point",
				    "coordinates": []
				  },
			  "properties": {
				    "name": "Start"
				  }
			
		}
	

		$scope.editLayer = {
			addMarker:{
				active:true,
				doMarker:function(){
					if($scope.editLayer.addMarker.active){
						$('#map').css('cursor', "crosshair");
						zeMap.on('click', function(e) {	
						console.log($scope.editLayer.addMarker.active);	
						    var latitude = e.latlng.lat;
						    var longitude = e.latlng.lng;

						    newmarker.geometry.coordinates=[longitude, latitude];
						    console.log(newmarker.geometry.coordinates);

						    $scope.maps[$routeParams.mapNo].geoJSON.push(newmarker);
						    console.log($scope.maps[$routeParams.mapNo].geoJSON);
						    console.log(latitude + " - " + longitude);
						    L.marker([latitude, longitude]).addTo(zeMap);
						    $scope.savechanges();
						    console.log(newmarker);
						});
					}
				}
			}
		};

		

		
		//tabs
		
		
}]);
