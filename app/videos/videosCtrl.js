// videosCtrl.js

var app = angular.module("psJwtApp");

app.controller('videosCtrl', function ($scope, $http, $sce, videoStorage) {
    $scope.videoStorage = new videoStorage();

    var players = [];

    $scope.onPlayerReady = function (API, index) {
        // Register player
        players[index] = API;
    };

    $scope.onUpdateState = function (state, index) {
        if (state === 'play') {
            // Pause other players
            for (var i = 0, l = players.length; i < l; i++) {
                if (i !== index) {
                    players[i].pause();
                }
            }
        }
    };

});
