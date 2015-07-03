(function () {
    angular.module('rewardsApp').controller('rewardsController', ['$scope', 'Rewards', function ($scope, Rewards) {
        $scope.title = 'Rewards';
        $scope.rewards = Rewards.all();
    }]);
})();