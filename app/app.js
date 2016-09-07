
var app = angular.module('game', []);
	app.controller('teamsController', ['$scope', function($scope){
		$scope.team1 = '';
		$scope.team2 = '';

		$scope.score1 = 0;
		$scope.score2 = 0;

		$scope.game = 162;
		$scope.extraScore = 0;



		$scope.actionList = [{actionTeam1: 0,actionTeam2: 0, delete:false}];


		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

		$scope.addScore21 = function(){

			var pointsTeam1 = $scope.addTo21 + $scope.extraScore;

			var pointsTeam2 = $scope.game + $scope.extraScore - pointsTeam1;

			$scope.actionList.push({actionTeam1:pointsTeam1, actionTeam2:pointsTeam2, delete:false});

			$scope.addTo21 = undefined;

			$scope.extraScore = 0;

			$scope.selected = [];

		};

		$scope.addScore22 = function(){

			var pointsTeam2 = $scope.addTo21 + $scope.extraScore;

			var pointsTeam1 = $scope.game + $scope.extraScore - pointsTeam2;

			$scope.actionList.push({actionTeam1:pointsTeam1, actionTeam2:pointsTeam2, delete:false});

			$scope.addTo21 = undefined;

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

		  	$scope.addings = [
				{name: 'Терц #1 (+20)', score:20},
				{name: 'Терц #2 (+20)', score:20},
				{name: 'Терц #3 (+20)', score:20},
				{name: 'Терц #4 (+20)', score:20},
				{name: 'Полтина #1 (+50)', score:50},
				{name: 'Полтина #2 (+50)', score:50},
				{name: 'Полтина #3 (+50)', score:50},
				{name: 'Белла(+20)', score:20}
				];

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
		        $scope.score1=0;
		        $scope.score2=0;
		        angular.forEach(oldList, function(x) {
		            if (!x.delete) {
		            	$scope.actionList.push(x);
							$scope.score1 = $scope.score1 + x.actionTeam1 *1;
							$scope.score2 = $scope.score2 + x.actionTeam2 *1;

							}
					
        			});
		  		};

		    	$scope.startNewGame = function() {
		    		$scope.team1 = '';
					$scope.team2 = '';

		    		$scope.actionList = [{actionTeam1: 0,actionTeam2: 0, delete:false}];
		         $scope.score1=0;
		         $scope.score2=0;

		    	};


	}]);
