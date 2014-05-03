describe('mapsApp controllers', function() {

  describe('MapsControllers', function(){
    var scope, ctrl;

    beforeEach(module('MapListCtrl'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('MapListCtrl', {$scope:scope});
    }));

    it('should create  model with 3 maps', function() {
      expect(scope.phones.length).toBe(3);
    });


    
  });
});