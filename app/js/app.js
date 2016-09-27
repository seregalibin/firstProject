
var app = angular.module('game', []);
	
	app.constant('standard', {
		team1: '',
		team2: '',

		score1: 0,
		score2: 0,

		gamepoints: 162,
		extraScore: 0,

	 	addings: [
			{name: 'Терц #1 (+20)', score:20},
			{name: 'Терц #2 (+20)', score:20},
			{name: 'Терц #3 (+20)', score:20},
			{name: 'Терц #4 (+20)', score:20},
			{name: 'Полтина #1 (+50)', score:50},
			{name: 'Полтина #2 (+50)', score:50},
			{name: 'Полтина #3 (+50)', score:50},
			{name: 'Белла(+20)', score:20}
			]

	});

	app.controller('teamsController', ['$scope', 'standard', function($scope, standard){

		$scope.team1 = standard.team1;
		$scope.team2 = standard.team2

		$scope.score1 = standard.score1;
		$scope.score2 = standard.score2;


		$scope.gamepoints = standard.gamepoints


		$scope.textScoreTeam1 = 0;
		$scope.textScoreTeam2 = 0;

		$scope.addTerz1 = 0;
		$scope.addTerz2 = 0;

		$scope.addPaltinas1 = 0;
		$scope.addPaltinas2 = 0;

		$scope.actionList = [];

		$scope.cleanFields = function() {
			$scope.addTeam1 = 0;
			$scope.addTeam2 = 0;

			$scope.textScoreTeam1 = 0;
			$scope.textScoreTeam2 = 0;

			$scope.addTerz1 = 0;
			$scope.addTerz2 = 0;

			$scope.addPaltinas1 = 0;
			$scope.addPaltinas2 = 0;

		};

		$scope.calcAddings = function(num) {
			if(num == 1) {
				var addPoints1 = 0;
					addPoints1 = $scope.addTerz1 * 20 + $scope.addPaltinas1 * 50;
					return addPoints1
			} else if (num == 2) {
				var addPoints2 = 0;
					addPoints2 = $scope.addTerz2 * 20 + $scope.addPaltinas2 * 50;
					return addPoints2
			} else {
				var addPointsAll = 0;
					addPointsAll = $scope.addTerz2 * 20 + $scope.addPaltinas2 * 50 + $scope.addTerz1 * 20 + $scope.addPaltinas1 * 50;
					return addPointsAll
			}
		};

		$scope.calcGamePins = function(num){
				var general = $scope.gamepoints;
			if(num == 1){
				return general
			} else {
				var allGeneral
					allGeneral = general + $scope.calcAddings();
				return allGeneral
			}
		};

		$scope.calcTextGamePoints = function(){
		 	$scope.textScoreTeam1 = $scope.addTeam1 + $scope.calcAddings(1);
		 	$scope.textScoreTeam2 = $scope.addTeam2 + $scope.calcAddings(2);
		};

		 $scope.addingScore = function(team) {
		 	var add1 = $scope.addTeam1;
		 	var add2 = $scope.addTeam2;
		 	var generalScore = $scope.calcGamePins(1);

		 	if(team == 1){
		  			$scope.addTeam2 = generalScore - $scope.addTeam1;
		  		} else if (team == 2) {
		  			$scope.addTeam1 = generalScore - $scope.addTeam2
		  		}
		  		$scope.calcTextGamePoints();
		  	};

		  	$scope.calcGameScore = function() {
		  		$scope.actionList.push({actionTeam1:$scope.textScoreTeam1, actionTeam2:$scope.textScoreTeam2, delete:false});
		  		$scope.cleanFields();
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
