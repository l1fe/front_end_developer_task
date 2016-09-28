// logoutCtrl.js

var app = angular.module("psJwtApp");

// logout controller
app.controller('logoutCtrl', function ($state, authService) {

    // logout user
    function logout() {
        authService.logout();
    }

    // logout & redirect
    logout();
    $state.go('auth.login');
});