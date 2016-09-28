// authToken.js

var app = angular.module("psJwtApp");

// authToken handles token operations for storing and retrieving
angular.module('psJwtApp').factory('authToken', function($window) {
    // store token in localStorage
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    var isAuthenticated = false;
    var authToken = {
        // set token to authenticate user
        setToken: function(token) {
            cachedToken = token;
            storage.setItem(userToken, token);
            isAuthenticated = true;
        },
        // get token from local storage
        getToken: function() {
            if (!cachedToken)
                cachedToken = storage.getItem(userToken);

            return cachedToken;
        },
        // check if user is authenticated by retrieving token
        isAuthenticated: function() {
            return !!authToken.getToken();
        },
        // logout user or kick when the session is expired
        removeToken: function() {
            cachedToken = null;
            storage.removeItem(userToken);
            isAuthenticated = false;
        }
    };

    return authToken;
});
