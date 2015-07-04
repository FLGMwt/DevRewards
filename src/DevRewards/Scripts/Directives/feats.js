(function() {
    'use strict';

    angular
        .module('rewardsApp')
        .directive('feats', feats);

    feats.$inject = ['$window'];
    
    function feats($window) {
        // Usage:
        //     <feats></feats>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Views/featsList.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();