// authService.js

var app = angular.module("psJwtApp");

// handling server authentication API
angular.module('psJwtApp').service('authService', function auth($http, $window, $q, API_URL, authToken) {

    // check auth response body if authentication success
    function authResponseValidUser(res) {
        if (res.status == 'success') {
            authToken.setToken(res.sessionId);
        }
    }

    // check logout response body
    function logoutResponseCheck(res) {
        if (res.status == 'success') {
            authToken.removeToken();
        }
    }

    // check if current user is authenticated
    this.isAuthenticated = function() {
        return authToken.isAuthenticated();
    };

    // HTTP login using provided credentials for API url
    // with check response callback
    this.login = function(username, password) {
        return $http.post(API_URL + 'user/auth', {
            username: username,
            password: password
        }).success(authResponseValidUser);
    };

    // HTTP logout API url
    // with check response callback
    this.logout = function () {
        return $http.get(API_URL + 'user/logout', { }).success(logoutResponseCheck);
    };
});
