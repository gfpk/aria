var mapList = angular.module('mapList', []);
 
	mapList.controller('mapListCtrl', ['$scope', '$http', '$timeout',
		function ($scope, $http, $timeout) {
			$http.get('http://127.0.0.1:3000/json/maps.json').success(function(data) {
				$scope.maps = data;
				$scope.rendermap = function(e){console.log(e)};
				$scope.testTimeOutfunction = function(){
			        var mapboxId = "gfpk.map-z6zqpvk6";
			        var arr = [1,2,3,3,4,4,4,5];
			        for(var i=0;i<arr;i++){
			        	console.log(arr);
			        }

			    };
				$timeout($scope.testTimeOutfunction(),100);

				
	});
}]);

