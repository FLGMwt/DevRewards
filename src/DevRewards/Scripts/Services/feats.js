(function () {
    angular.module('rewardsServices')
    .factory('Feats', ['$resource', function ($resource) {
        return $resource('/api/Feats/', {}, {});
    }]);
})();