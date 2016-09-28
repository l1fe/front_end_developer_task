// authInterceptor.js

var app = angular.module("psJwtApp");

angular.module('psJwtApp').factory('authInterceptor', function($q, authToken, $injector, API_URL) {
    return {
        request: function(config) {
            var token = authToken.getToken();
            config.params = config.params || {};

            // append sessionId to all API_URL requests
            if (token && config.url.indexOf(API_URL) !== -1) {
                config.params.sessionId = token;
            }

            return config;
        },
        responseError: function(rejection) {
            var defer = $q.defer();

            // catch 401 error (session expired or not authorized)
            if (rejection.status == 401) {

                    // session expired
                    if (authToken.isAuthenticated()) {
                        authToken.removeToken();
                    }

                    // prevent circular dependencies
                    var state = $injector.get('$state');
                    state.go('auth.login');
            }

            defer.reject(rejection);

            return defer.promise;
        }
    };
});

