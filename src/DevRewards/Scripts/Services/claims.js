(function () {
    angular.module('rewardsServices')
    .factory('Claims', ['$resource', function ($resource) {
        return $resource('/api/Claims/:id', { id: '@id' }, {});
    }]);
})();