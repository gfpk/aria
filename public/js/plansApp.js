var plansApp = angular.module('plansApp', [
	'PlansControllers',
	"xeditable"
]);
plansApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});