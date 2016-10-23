angular.module('Debbiapp.sevices', []).
  factory('calcService', function(models, standard) {

    var calcService = {};

    // calcService.Objects = {
    //   team1: {
    //     name: '',
    //     addTeam1: 0,
    //     textScoreTeam1: 0,
    //     addTerz1: 0,
    //     addPaltinas1: 0
    //   },
    //   team2: {
    //     name: '',
    //     addTeam2: 0,
    //     textScoreTeam2: 0,
    //     addTerz2: 0,
    //     addPaltinas2: 0
    //   },
    // };

    calcService.Objects = models.Models.Objects;

    calcService.gamepoints = standard.gamepoints,

    calcService.actionList = [];

    calcService.selected = [];

    calcService.score1 = 0;
    calcService.score2 = 0;



    calcService.cleanFields = function() {
      calcService.Objects.team1.addTeam1 = 0;
      calcService.Objects.team2.addTeam2 = 0;

      calcService.Objects.team1.textScoreTeam1 = 0;
      calcService.Objects.team2.textScoreTeam2 = 0;

      calcService.Objects.team1.addTerz1 = 0;
      calcService.Objects.team2.addTerz2 = 0;

      calcService.Objects.team1.addPaltinas1 = 0;
      calcService.Objects.team2.addPaltinas2 = 0;

    };

    calcService.calcAddings = function(num) {
      if(num == 1) {
        var addPoints1 = 0;
          addPoints1 = calcService.Objects.team1.addTerz1 * 20 + calcService.Objects.team1.addPaltinas1 * 50;
          return addPoints1
      } else if (num == 2) {
        var addPoints2 = 0;
          addPoints2 = calcService.Objects.team2.addTerz2 * 20 + calcService.Objects.team2.addPaltinas2 * 50;
          return addPoints2
      } else {
        var addPointsAll = 0;
          addPointsAll = calcService.Objects.team2.addTerz2 * 20 + calcService.Objects.team2.addPaltinas2 * 50 + calcService.Objects.team1.addTerz1 * 20 + calcService.Objects.team1.addPaltinas1 * 50;
          return addPointsAll
      }
    };

    calcService.calcGamePins = function(num){
        var general = calcService.gamepoints;
      if(num == 1){
        return general
      } else {
        var allGeneral
          allGeneral = general + calcService.calcAddings();
        return allGeneral
      }
    };

    calcService.calcTextGamePoints = function(){
      calcService.Objects.team1.textScoreTeam1 = calcService.Objects.team1.addTeam1 + calcService.calcAddings(1);
      calcService.Objects.team2.textScoreTeam2 = calcService.Objects.team2.addTeam2 + calcService.calcAddings(2);
    };

    calcService.addingScore = function(team) {
      var generalScore = calcService.calcGamePins(1);

      if(team == 1){
            calcService.Objects.team2.addTeam2 = generalScore - calcService.Objects.team1.addTeam1;
          } else if (team == 2) {
            calcService.Objects.team1.addTeam1 = generalScore - calcService.Objects.team2.addTeam2
          }
        calcService.calcTextGamePoints();
        };

    calcService.calcGameScore = function() {
          calcService.actionList.push({actionTeam1:calcService.Objects.team1.textScoreTeam1, actionTeam2:calcService.Objects.team2.textScoreTeam2, delete:false});
          calcService.cleanFields();
    };


    calcService.toggle = function (item) {
        var idx = calcService.selected.indexOf(item);
        if (idx = -1)
            calcService.selected.push(item)
        else
            calcService.selected.splice(idx, 1);
    };

    calcService.isExists = function (item) {
        return calcService.selected.indexOf(item) > -1;
    };

/////// Удаление выбраных игр /////
    calcService.remove = function() {
        var oldList = calcService.actionList;
        calcService.actionList = [];
        calcService.score1 = 0;
        calcService.score2 = 0;
        angular.forEach(oldList, function(x) {
            if (!x.delete) {
              calcService.actionList.push(x);
          calcService.score1 = calcService.score1 + x.actionTeam1 *1;
          calcService.score2 = calcService.score2 + x.actionTeam2 *1;

          }

      });
  };

    calcService.startNewGame = function() {
        calcService.team1 = standard.team1;
        calcService.team2 = standard.team2

        calcService.score1 = standard.score1;
        calcService.score2 = standard.score2;

        calcService.extraScore = standard.extraScore;

        calcService.actionList = [];

          };


    return calcService;
  });