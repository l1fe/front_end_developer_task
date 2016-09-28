// navbarCtrl.js

var app = angular.module("psJwtApp");

app.controller('navbarCtrl', function ($scope, authService) {
    $scope.isAuthenticated = function() {
        return authService.isAuthenticated();
    }
});
