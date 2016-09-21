angular.module('Debbiapp.sevices', []).
  factory('calcService', function(standard) {

    var calcService = {};

    calcService.calcScore = function(gameObj) {
      var totalScores = 0;
          console.log("121")
      //	totalScores = gameObj.team1.points + gameObj.team2.points ;
      return totalScores;
    };

    calcService.countTeamsScore = function(score, team){
    	var standardGame = 162;
    	var otherScore = 0;
    		otherScore = standardGame - score;
    		console.log("121")
    		if(team == 1)
    			$scope.team2Points = otherScore;
    		else{
    			$scope.team1Points = otherScore;
    		}
    };

    return calcService;
  });