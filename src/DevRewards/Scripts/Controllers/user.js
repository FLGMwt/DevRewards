(function () {
    angular.module('rewardsApp').controller('userController', ['$scope', 'Users', function ($scope, Users) {
        $scope.$on('rewardClaimed', function(event, args) {
            setUser();
        });

        function setUser() {
            var user = Users.get({ id: 1 });
            user.$promise.then(function (data) {
                $scope.name = data.name;
                $scope.points = data.points;
            });
        }
        setUser();
    }]);
})();