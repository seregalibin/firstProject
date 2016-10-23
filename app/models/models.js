angular.module('Debbiapp.models', []).
  factory('models', function() {

  		var Models = {};

  		Models.Objects = {
  			team1: {
	        name: '',
	        addTeam1: 0,
	        textScoreTeam1: 0,
	        addTerz1: 0,
	        addPaltinas1: 0
      	},
	      team2: {
	        name: '',
	        addTeam2: 0,
	        textScoreTeam2: 0,
	        addTerz2: 0,
	        addPaltinas2: 0
	      }

  		};

  		return Models;
  });
