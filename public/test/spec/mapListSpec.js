describe('MapListCtrl', function(){

  it('should create "maplist" model with 4 maps', function() {
    var scope = {},
        ctrl = new MapListCtrl(scope);

    expect(scope.mapsx.length).toBe(3);
  });

});