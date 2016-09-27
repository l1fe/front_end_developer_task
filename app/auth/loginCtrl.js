// loginCtrl.js

var app = angular.module("psJwtApp");

app.controller('loginCtrl', function ($scope, $state, $http, md5, authService, API_URL) {
    var isAuthenticated = authService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
        $state.go('home');
    }

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
                console.log('loginCtrl:login err', err);
                $scope.authSuccess = 0;
            }
        );

    };
});
