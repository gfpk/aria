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
			console.log('saved')
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


		//sortable

		angular.element(document).ready(function () {

		var ind = 0;

		   $( "#itemlist" ).sortable({ 
		   		handle: '.fa-sort',
		        stop: function(event,ui){  
			          var n = ($( "#itemlist" ).sortable('toArray')).toString();
			          console.log(n);
			          var neworder = n.split(',').map(function(item) {return parseInt(item, 10);}); 
			          console.log(neworder);

			        }
		    });
		   $('.fa-sort').tooltip();
		   $('.fa-trash-o').tooltip();

		});
		

	}		
]);
