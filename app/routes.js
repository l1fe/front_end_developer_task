// routes.js

var app = angular.module("psJwtApp");

// routing

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // $urlRouterProvider.otherwise('/videos');

    $stateProvider
        .state('videos', {
            url: '/videos',
            templateUrl: 'app/components/video_list/videos.html',
            controller: 'videoListCtrl'
        })

        .state('video', {
            url: "/video/:videoId",
            templateUrl: 'app/components/video_single/video.html',
            controller: 'videoSingleCtrl'
        })

        .state('auth', {
            url: '/auth',
            abstract: true,
            templateUrl: 'app/components/auth/index.html'
        })

        .state('auth.login', {
            url: '/login',
            templateUrl: 'app/components/auth/login.html',
            controller: 'loginCtrl'
        })

        .state('auth.logout', {
            url: '/logout',
            templateUrl: 'app/components/auth/logout.html',
            controller: 'logoutCtrl'
        });

    $httpProvider.interceptors.push('authInterceptor');
});
