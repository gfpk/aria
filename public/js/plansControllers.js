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
var storagekey = 'fitPlanData';
var localPlanData = localstorage.get(storagekey);
var resourceURL = 'http://127.0.0.1:3000/json/plan.json';

plansControllers.controller('PlanController', ['$scope','$http', 
	function ($scope, $http){

		$scope.plan=[];
		
		if(localPlanData){
			$scope.plan = localPlanData;
			
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.plan = data;
				localstorage.set(storagekey, data);
			});
		};

		
		$scope.savechanges = function(){
			localstorage.set(storagekey, $scope.plan);
			
		};

		$scope.remove=function(item){ 
			var ind=$scope.plan.planitems.indexOf(item)
			$scope.plan.planitems.splice(ind,1);  
			$scope.savechanges();   

		}
		$scope.stageToggle=function(item){ 
			var ind=$scope.plan.planitems.indexOf(item)
			$scope.plan.planitems[ind].done == false ? ($scope.plan.planitems[ind].done = true):($scope.plan.planitems[ind].done = false);
			$scope.savechanges();

		}

		$scope.indexyfy = function(item){


		}
		$scope.addItem = function(){
			var x = new Object;
			x.index = ($scope.plan.planitems.length +1);
			x.title = "Change me";
			x.date ="Default";
			x.tytpe = "training";
			x.icon = "img/planicons/training.png";
			x.description = "add Description here";
			x.done = false;
			$scope.plan.planitems.push(x);
			console.log(x);
			console.log($scope.plan.planitems);
		};



		//sortable
		$scope.$watch("plan.planitems", function(value) {
	        console.log("Model: " + value.map(function(e){return e.index}).join(','));
	        $scope.savechanges(); 
	        console.log($scope.plan.planitems)
	    },true);

	    //droppable


		angular.element(document).ready(function () {
		   $('.fa-sort').tooltip();
		   $('.fa-trash-o').tooltip();
		});
		

	

}]);
