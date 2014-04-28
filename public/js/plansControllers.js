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
var resourceURL = ( "http://" + window.location.host +'/json/plan.json');

plansControllers.controller('PlanController', ['$scope','$http', 
	function ($scope, $http){

		$scope.plan=[];
		
		if(localPlanData){
			$scope.plan = localPlanData;
			
		}else{
			$http.get(resourceURL).success(function(data) {
				$scope.plan = data;
				console.log($scope.plan)
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
		$scope.addItem = function(type){
			var x = new Object;
			x.index = ($scope.plan.planitems.length +1);
			x.title = "Change me";
			x.date = new Date(Date.now());
			x.type = type;
			x.icon = "img/planicons/training.png";
			x.description = "add Description here";
			x.done = false;
			console.log(Date.now());
			$scope.plan.planitems.push(x);
			
		};



		//sortable
		$scope.$watch("plan.planitems", function(value) {
	        //console.log("Model: " + value.map(function(e){return e.index}).join(','));
	        $scope.savechanges(); 
	        //console.log($scope.plan.planitems)
	    },true);

	    

		angular.element(document).ready(function () {
		   $('.fa-sort').tooltip();
		   $('#ui-panel img').tooltip();
		   $('.fa-trash-o').tooltip();
		});
		

	

}]);
