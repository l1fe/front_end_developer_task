// authInterceptor.js

var app = angular.module("psJwtApp");

angular.module('psJwtApp').factory('authInterceptor', function(authToken) {
    return {
        request: function(config) {
            var token = authToken.getToken();
            config.params = config.params || {};

            if (token && config.url.indexOf('localhost') !== -1) {
                config.params.sessionId = token;
            }
            return config;
        }
    };
});

