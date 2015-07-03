(function() {
    'use strict';

    angular
        .module('rewardsApp')
        .directive('rewards', rewards);

    rewards.$inject = ['$window'];
    
    function rewards ($window) {
        // Usage:
        //     <reward></reward>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Views/list.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();