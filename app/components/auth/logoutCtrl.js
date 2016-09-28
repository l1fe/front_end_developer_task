// logoutCtrl.js

var app = angular.module("psJwtApp");

// logout controller for handling logout
app.controller('logoutCtrl', function ($state, authService) {

    // logout user
    this.logout = function() {
        authService.logout();
    };

    // logout & redirect
    this.logout();
    $state.go('auth.login');
});