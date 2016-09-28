// videoListCtrl.js

var app = angular.module("psJwtApp");

// video list controller for handling ajax loading & prevent simultaneous multiple video play
app.controller('videoListCtrl', function ($scope, $state, $http, $sce, videoService) {

    // prevent simultaneous multiple video play
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

    // infinite scroll videos & lock
    $scope.videos = [];
    $scope.loaderBusy = false;

    var last = 0;
    var VIDEOS_PER_PAGE = 10;

    // ajax load page by infite scroll
    $scope.loadNextPage = function() {
        $scope.loaderBusy = true;

        videoService.loadVideoList(last, VIDEOS_PER_PAGE).success(function (res) {

            var videos = res.data;
            if (videos.length == 0) {
                $scope.noMorePossibleResults = true;
            }
            for (var i = 0; i < videos.length; ++i) {
                videoService.setVideogularConfig(videos[i]);
                videoService.setAvgRating(videos[i]);
                $scope.videos.push(videos[i]);
            }
            last += VIDEOS_PER_PAGE;
            $scope.loaderBusy = false;

        });
    };

    // click handler to navigate through videos
    $scope.clickHandler = function(videoId){
        $state.go('video', {videoId: videoId});
    }
});
