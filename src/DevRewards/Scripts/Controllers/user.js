(function () {
    angular.module('rewardsApp').controller('userController', ['$scope', 'Users', function ($scope, Users) {
        console.log('before get');
        var user = Users.get({ id: 1 });
        console.log('after get');
        console.log('user:' + JSON.stringify(user));
        user.$promise.then(function (data) {
            $scope.name = data.name;
            $scope.points = data.points;
        });
    }]);
})();