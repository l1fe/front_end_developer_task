// authService.js

var app = angular.module("psJwtApp");

angular.module('psJwtApp').service('authService', function auth($http, $window, $q, API_URL, authToken) {
    function authResponseValidUser(res) {
        return res.status == 'success';
    }

    function authSuccessful(res) {
        if (authResponseValidUser(res)) {
            authToken.setToken(res.sessionId);
        }
    }

    this.isAuthenticated = function() {
        return authToken.isAuthenticated();
    };

    this.login = function(username, password) {
        return $http.post(API_URL + 'user/auth', {
            username: username,
            password: password
        }).success(authSuccessful);
    };

    this.logout = function () {
        console.log('authService log out');
        authToken.removeToken();
    };
});
