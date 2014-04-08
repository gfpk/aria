this.appControll = function($scope) {
 $scope.entries = [
    {
      name: "Larry"
    }, {
      name: "Curly"
    }, {
      name: "Moe"
    }
  ],
  $scope.addEntry = function(){

    $scope.entries.push($scope.newEntry);
    $scope.newEntry = {}

  },
  $scope.drawWinner = function(){

    entry = $scope.entries[Math.floor(Math.random() * $scope.entries.length)];
    entry.winner = true;
    $scope.lastWinner = entry;

  }
};
