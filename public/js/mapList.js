var mapList = angular.module('mapList', []);
 
	mapList.controller('mapListCtrl', ['$scope', '$http','$timeout',
		function ($scope, $http, $timeout) {
			$http.get('http://127.0.0.1:3000/json/maps.json').success(function(data) {
				$scope.maps = data;
				$scope.rendermaps = (function(){
			        var mapboxId = "gfpk.map-z6zqpvk6";
			        var arr = ($scope.maps);
			        for(var i =0;i<arr.length;i++){
			        	var elId ="map-" + String(i); 	
			        	var elem = document.getElementById(elId);
			        	var mapData = arr[i];
			        	console.log(mapData);
			        	L.mapbox.map(elId, mapboxId).setView(mapData.geo.center, mapData.geo.zoom);;



			        }
			       
			    });

				$timeout($scope.rendermaps,1000);

				
	});
}]);

