var mapList = angular.module('mapList', []);
 
	mapList.controller('mapListCtrl', ['$scope', '$http', 
		function ($scope, $http) {
			$http.get('http://127.0.0.1:3000/json/maps.json').success(function(result) {
				$scope.maps = result;
				$scope.getEntities = (function(){
					return(alert('boo'))});


				
	});
}]);

