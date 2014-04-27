var statsControllers = angular.module('StatsControllers', []);

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
var	themeindex = 2;
var storagekey = 'fitStatData';
var localStatData = localstorage.get(storagekey);
var resourceURL = 'http://127.0.0.1:3000/json/stats.json';

statsControllers.controller('StatsController', ['$scope','$http', 
	function ($scope, $http){

		$scope.stats=[];
		
		if(localStatData){
			$scope.stats = localStatData;
			 // console.log($scope.stats);
		}else{
			$http.get(resourceURL).success(function(data) {
				// console.log(data);
				$scope.stats = data;
				localstorage.set(storagekey, data);
				// console.log($scope.stats[0].title.text );
			});

		};

		$scope.renderstat = function(obj){

			var chart = new CanvasJS.Chart(obj, {
                theme: $scope.stats[themeindex].theme,
                title:{
                    text: $scope.stats[themeindex].text            
                },
                data: $scope.stats[themeindex].data
                
            });
            chart.render();
		}
		 
		
		

		angular.element(document).ready(function () {
		  
		   $scope.renderstat("chartContainer1");
		    //console.log($scope.stats[0].text);
		});
		

	

}]);
