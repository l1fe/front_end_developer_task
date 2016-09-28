// loginCtrl.js

var app = angular.module("psJwtApp");

// login controller for handling login panel
app.controller('loginCtrl', function ($scope, $state, $http, md5, authService) {
    // Check if user is logged in
    // Redirect authorized user to videos state
    var isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
        $state.go('videos');
    }

    // Handles the shake animation
    $scope.authSuccess = 1;

    // Prevents alert message from hiding for multiple incorrect login attempts to smoother the shake animation
    $scope.authAlertShown = 0;

    // Fires on login button click
    $scope.submit = function () {
        $scope.authSuccess = 1;

        var username = $scope.username;
        var passwordHash = md5.createHash($scope.password || '');

        authService.login(username, passwordHash).then(
            function (res) {
                if ( res.data.status == 'success') {
                    $state.go('videos');
                } else {
                    var message = 'Invalid username or password';
                    $scope.authSuccess = 0;
                    $scope.authAlertShown = 1;
                    $scope.authMessage = message;
                }
            },
            function(err) {
                $scope.authSuccess = 0;
                $scope.authAlertShown = 1;
                $scope.authMessage = 'Server error';
            }
        );

    };

    $scope.closeAlert = function() {
        $scope.authAlertShown = 0;
    }
});
