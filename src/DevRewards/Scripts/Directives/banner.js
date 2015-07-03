(function() {
    'use strict';

    angular
        .module('rewardsApp')
        .directive('banner', banner);

    banner.$inject = ['$window'];
    
    function banner($window) {
        // Usage:
        //     <banner></banner>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Views/banner.html'
        };
        return directive;

        function link(scope, element, attrs) {
            element.slabText();
        }
    }

})();