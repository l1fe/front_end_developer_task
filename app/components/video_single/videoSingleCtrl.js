// videoSingleCtrl.js

var app = angular.module("psJwtApp");

// single page video controller

app.controller('videoSingleCtrl', function ($scope, $stateParams, videoService) {

    $scope.starRating = 0;
    $scope.freezeRate = false;
    $scope.rateStatus = 'Rate this video!';

    var videoId = $stateParams.videoId;

    $scope.video = {};

    $scope.videoExists = 1;

    videoService.loadVideo(videoId).then(
        function(res) {
            res = res.data;

            if (res.status == 'success') {
                // found video
                $scope.video = res.data;
                videoService.setVideogularConfig($scope.video);
                videoService.setAvgRating($scope.video);
            } else {
                $scope.videoExists = 0;
            }
        },
        function(err) {
            // video not found results in 400 Bad request
            $scope.videoExists = 0;
        }
    );

    $scope.rateVideo = function(param) {
        videoService.rateVideo($scope.video._id, param).then(function(res){
            console.log(res);
            $scope.video.ratings = res.data.data.ratings;
            videoService.setAvgRating($scope.video);
            $scope.freezeRate = true;
            $scope.rateStatus = 'Thank you for your rating!';
        });
    }
});
