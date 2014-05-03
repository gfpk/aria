var mapApp = angular.module('mapApp', [
	'ngRoute',
	'MapsControllers'
]);

mapApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/maps.html', {
			templateUrl: 'partials/maplist.html',
			controller: 'MapListCtrl'
		}).
		when('/maps.html/:mapNo', {
			templateUrl: 'partials/singlemap.html',
			controller: 'SingleMapCtrl'
		}).
		otherwise({
			redirectTo: '/maps.html'
	});
		
}]);

