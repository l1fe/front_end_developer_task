// loginCtrl.js

var app = angular.module("psJwtApp");

app.controller('loginCtrl', function ($scope, $state, $http, md5, authService) {
    var isAuthenticated = authService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
        $state.go('home');
    }

    $scope.authSuccess = 1;

    $scope.submit = function () {
        var username = $scope.username;
        var passwordHash = md5.createHash($scope.password || '');


        authService.login(username, passwordHash).then(
            function (res) {
                console.log('loginCtrl:login', res.data);
                if ( res.data.status == 'success') {
                    $state.go('home');
                } else {
                    var message = 'Invalid username or password';
                    $scope.authSuccess = 0;
                    $scope.authMessage = message;
                }
            },
            function(err) {
                $scope.authSuccess = 0;
                $scope.authMessage = 'Server error';
            }
        );

    };

    $scope.refreshAuthSuccess = function() {
        $scope.authSuccess = 1;
    }
});
