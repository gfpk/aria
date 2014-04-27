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
var storagekey = 'fitStatData';
var localStatData = localstorage.get(storagekey);
var resourceURL = 'http://127.0.0.1:3000/json/stats.json';

statsControllers.controller('StatsController', ['$scope','$http', 
	function ($scope, $http){

		$scope.stats=[];
		
		if(localStatData){
			$scope.stats = localStatData;
			
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.stats = data;
				localstorage.set(storagekey, data);
			});
		};
		$scope.renderstat = function(obj, type, theme){

			var chart = new CanvasJS.Chart(obj, {
                theme: theme,//theme1
                title:{
                    text: "How long I ran....."              
                },
                data: [              
                {
                   
                    type: type,
	                    dataPoints: [

			                    { label: "Week 1", y: 100 },
			                    { label: "Week 2", y: 15 },
			                    { label: "Week 3", y: 25 },
			                    { label: "Week 4", y: 55 },
			                    { label: "Week 5", y: 28 }
		                    ]
	                	}
	                ]
            });
            chart.render();
          //  console.log("After chart render")

		}
		 
		
		

		angular.element(document).ready(function () {
		  
		   $scope.renderstat("chartContainer1", "column", "theme2");
		   // console.log("After angular render");
		});
		

	

}]);
