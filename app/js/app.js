
var app = angular.module('game', ['Debbiapp.sevices']);
	
	app.constant('standard', {
		team1: '',
		team2: '',

		score1: 0,
		score2: 0,

		gamepoints: 162,
		extraScore: 0,

	 	addings: [
			{name: 'Терц #1 (+30)', score:30},
			{name: 'Терц #2 (+30)', score:30},
			{name: 'Терц #3 (+30)', score:30},
			{name: 'Терц #4 (+30)', score:30},
			{name: 'Полтина #1 (+50)', score:50},
			{name: 'Полтина #2 (+50)', score:50},
			{name: 'Полтина #3 (+50)', score:50},
			{name: 'Белла(+20)', score:20}
			]

	});

	  


	app.controller('teamsController', ['$scope', 'standard','calcService', function($scope, standard, calcService){

		$scope.lalflfl = undefined;

		$scope.team1 = standard.team1;
		$scope.team2 = standard.team2

		$scope.score1 = standard.score1;
		$scope.score2 = standard.score2;

		$scope.gamepoints = standard.gamepoints

		$scope.extraScore = 0;

		$scope.actionList = [];

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

		$scope.team1Points = $scope.gamepoints - $scope.team2Points;
		$scope.team1Tertses = 0;
		$scope.team1Paltinas = 0;
		$scope.team1Bella = 0;

		$scope.team2Points = $scope.gamepoints - $scope.team1Points;
		$scope.team2Tertses = 0;
		$scope.team2Paltinas = 0;
		$scope.team2Bella = 0;

		var currentGameObj = {
			team1: {
				points: $scope.team1Points,
				tertses: $scope.team1Tertses,
				paltinas: $scope.team1Paltinas,
				bella: $scope.team1Bella
			},
			team2: {
				points: $scope.team2Points,
				tertses: $scope.team2Tertses,
				paltinas: $scope.team2Paltinas,
				bella: $scope.team2Bella
			}
		};


			$scope.totalScores = calcService.calcScore(currentGameObj);
			
			// $scope.countTeamsScore1 = calcService.countTeamsScore(team1Points, 1);
			// $scope.countTeamsScore2 = calcService.countTeamsScore(team2Points, 2);


			$scope.addScore21 = function(){

				var countPointsTeam11 = $scope.extraScore + $scope.addTo21;
				var countPointsTeam12 = $scope.gamepoints + $scope.extraScore - countPointsTeam11;

				$scope.actionList.push({actionTeam1:countPointsTeam11, actionTeam2:countPointsTeam12, delete:false});

				$scope.addTo21 = "";

				$scope.extraScore = 0;

				$scope.selected = [];

			};

			$scope.addScore22 = function(){

				var countPointsTeam21 = $scope.gamepoints + $scope.extraScore - $scope.addTo21;
				var countPointsTeam22 = $scope.extraScore + $scope.addTo21;

				$scope.actionList.push({actionTeam1:countPointsTeam21, actionTeam2:countPointsTeam22, delete:false});

				$scope.addTo21 = "";

				$scope.extraScore = 0;

				$scope.selected = [];
			};

			$scope.addScore3 = function(team){
	 			angular.forEach($scope.selected, function(x){
	 				if (x.score){
	 					$scope.extraScore = $scope.extraScore + x.score;
	 				}
	 			});

				if (team == 1) 
					$scope.addScore21()
				 else 
					$scope.addScore22();
				
			};



///// Прибавление очков //////

		  	$scope.addings = standard.addings


	        $scope.selected = [];

	        $scope.toggle = function (item) {
	            var idx = $scope.selected.indexOf(item);
	            if (idx = -1)
	                $scope.selected.push(item)
	            else
	                $scope.selected.splice(idx, 1);
	        };

	        $scope.isExists = function (item) {
	            return $scope.selected.indexOf(item) > -1;
        };

/////// Удаление выбраных игр /////
        	   $scope.remove = function() {
		        var oldList = $scope.actionList;
		        $scope.actionList = [];
		        $scope.score1 = 0;
		        $scope.score2 = 0;
		        angular.forEach(oldList, function(x) {
		            if (!x.delete) {
		            	$scope.actionList.push(x);
							$scope.score1 = $scope.score1 + x.actionTeam1 *1;
							$scope.score2 = $scope.score2 + x.actionTeam2 *1;

							}
					
        			});
		  		};

		    	$scope.startNewGame = function() {
					$scope.team1 = standard.team1;
					$scope.team2 = standard.team2

					$scope.score1 = standard.score1;
					$scope.score2 = standard.score2;

					$scope.extraScore = standard.extraScore;

		    		$scope.actionList = [];

		    	};

	}]);
