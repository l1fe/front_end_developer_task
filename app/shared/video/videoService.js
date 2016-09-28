// videoService.js

var app = angular.module("psJwtApp");

angular.module('psJwtApp').service('videoService', function ($http, $sce, API_URL) {
    // HTTP GET multiple videos by API URL
    this.loadVideoList = function(skip, limit) {
        return $http.get(API_URL + 'videos?skip=' + skip + '&limit=' + limit);
    };

    // HTTP GET single video by API URL
    this.loadVideo = function(videoId) {
        return $http.get(API_URL + 'video?videoId=' + videoId);
    };

    // HTTP POST rate single video by API URL
    this.rateVideo = function(videoId, rating) {
        console.log('rate video attempt');
        console.log(videoId, rating);
        console.log(API_URL + 'video/ratings');
        return $http.post(API_URL + 'video/ratings', {
            videoId: videoId,
            rating: rating
        });
    };


    // set videogular options including URL for video
    this.setVideogularConfig = function(video) {
        video.config = {
            preload: "none",
            sources: [
                {src: $sce.trustAsResourceUrl(API_URL + video.url), type: "video/mp4"}
            ],
            theme: {
                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            }
        };
    };

    this.setAvgRating = function(video) {
        video.avgRating = this.GetAvgRating(video);
    }

    // calculate and set average rating for video
    this.GetAvgRating = function(video) {
        // Calculate average rating by using js reduce : Avg = (1/n)Σx_i (i = 1..n)
        return video.ratings.reduce(function(sum, a) { return sum + a }, 0)/(video.ratings.length || 1);
    }
});
