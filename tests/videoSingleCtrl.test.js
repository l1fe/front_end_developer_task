describe('videoSingleCtrl', function() {
    var scope, $controller, ctrl;
    beforeEach(function() {
        module('psJwtApp');
    });

    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('videoSingleCtrl', {
            $scope: scope
        });
    }));

    it('should expect video exists', function() {
        expect(scope.videoExists).toBe(1);
    });

});
