(function () {
    angular
        .module('rewardsApp')
        .directive('banner', banner);

    banner.$inject = ['$window'];
    
    function banner($window) {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Views/banner.html'
        };
        return directive;

        function link(scope, element, attrs) {
            debugger;
            element.slabText();
        }
    }
})();