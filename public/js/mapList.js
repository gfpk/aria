var mapList = angular.module('mapList', []);
 
	mapList.controller('MapListCtrl', function ($scope, $http) {
		$http.get('http://127.0.0.1:3000/json/maps.json').success(function(data) {
		$scope.maps = data;
	});
});