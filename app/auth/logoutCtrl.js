// loginCtrl.js

var app = angular.module("psJwtApp");

app.controller('logoutCtrl', function ($state, authService) {
    console.log('logout ctrl');
    function logout() {
        authService.logout();
    }

    logout();
    $state.go('home');
});