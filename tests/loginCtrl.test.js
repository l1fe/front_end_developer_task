describe('loginCtrl', function() {
    var scope, $controller, ctrl;
    beforeEach(function() {
        module('psJwtApp');
    });

    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('loginCtrl', {
            $scope: scope
        });
    }));

    it('should not show error at the start', function() {
        expect(scope.authAlertShown).toBe(0);
    });

    it('should have auth success as true at the start', function() {
        expect(scope.authSuccess).toBe(1);
    });

    it('should have login function', function() {
        expect(scope.submit).toBeDefined();
    });
});
