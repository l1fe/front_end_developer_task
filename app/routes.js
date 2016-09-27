// routes.js

var app = angular.module("psJwtApp");

app.config(function ($stateProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/partial-home.html',
            controller: 'videosCtrl'
        })

        .state('auth', {
            url: '/auth',
            abstract: true,
            templateUrl: 'app/auth/index.html'
        })

        .state('auth.login', {
            url: '/login',
            templateUrl: 'app/auth/login.html',
            controller: 'loginCtrl'
        })

        .state('auth.logout', {
            url: '/logout',
            templateUrl: 'app/auth/logout.html',
            controller: 'logoutCtrl'
        })

        .state('auth.register', {
            url: '/register',
            templateUrl: 'app/auth/register.html'
        });

    $httpProvider.interceptors.push('authInterceptor');

});
