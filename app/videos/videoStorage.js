// videoStorage.js

var app = angular.module("psJwtApp");

app.factory('videoStorage', function($http, $sce, API_URL) {


    var videoStorage = function() {
        this.videos = [];
        this.busy = false;
        this.last = 0;
        this.noMorePossibleResults = false;
        this.VIDEOS_PER_PAGE = 10;
    };



    videoStorage.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;
        console.log('nextPage call');
        $http.get(API_URL + 'videos?skip=' + this.last + '&limit=' + this.VIDEOS_PER_PAGE)
            .success(function (res) {
                var videos = res.data;
                console.log(videos);
                if (videos.length == 0) {
                    this.noMorePossibleResults = true;
                    console.log('no more possible results');
                }
                for (var i = 0; i < videos.length; ++i) {
                    videos[i].config = {
                        preload: "none",
                        sources: [
                            {src: $sce.trustAsResourceUrl(API_URL + videos[i].url), type: "video/mp4"}
                        ],
                        theme: {
                            url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                        }
                    };

                    this.videos.push(videos[i]);
                }
                this.last += this.VIDEOS_PER_PAGE;
                this.busy = false;

            }.bind(this));

    };

    return videoStorage;
});