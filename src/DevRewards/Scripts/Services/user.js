(function () {
    angular.module('rewardsServices')
    .factory('Users', ['$resource', function ($resource) {
        return $resource('/api/users/:id', {id: '@id'}, {});
    }]);
})();