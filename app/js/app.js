
var app = angular.module('game', ['Debbiapp.sevices']);
	
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

	app.controller('teamsController', ['$scope', 'standard', 'calcService', function($scope, standard, calcService){

		$scope.obj = calcService.Objects;	
		$scope.fn = calcService;	

	}]);
