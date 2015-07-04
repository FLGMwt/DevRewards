(function () {
    angular.module('rewardsServices')
    .factory('Rewards', ['$resource', function ($resource) {
        return $resource('/api/Rewards/', {}, {});
    }]);
})();