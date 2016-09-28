describe('logoutCtrl', function() {
    var scope, $controller, ctrl;
    beforeEach(function() {
        module('psJwtApp');
    });

    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('logoutCtrl', {
            $scope: scope
        });
    }));

    it('should have logout function', function() {
        expect(ctrl.logout).toBeDefined();
    });
});
