(function () {
    angular.module('rewardsServices', ['ngResource'])
    .factory('Rewards', ['$resource', function ($resource) {
        return $resource('/api/rewards/', {}, {
            //query: { method: 'GET', params: {}, isArray: true }
        });
    }]);
})();