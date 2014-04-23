var plansControllers = angular.module('PlansControllers', []);

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

var localPlanData = localstorage.get('fitPlanData');
var resourceURL = 'http://127.0.0.1:3000/json/plan.json';

plansControllers.controller('PlanController', ['$scope','$http', 
	function ($scope, $http){

		$scope.plan=[];
		$scope.planitems = [];


		if(localPlanData){
			$scope.plan = localPlanData;
			$scope.planitems = localPlanData.planitems;	
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.plan = data;
				$scope.planitems = data.planitems;
				localstorage.set('fitPlanData', data);
			});
		};

		console.log($scope.plan);

	}		
]);
