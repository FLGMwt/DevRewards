(function() {
    'use strict';

    angular
        .module('rewardsApp')
        .directive('reward', reward);

    reward.$inject = ['$window'];
    
    function reward ($window) {
        // Usage:
        //     <reward></reward>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Views/reward.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();