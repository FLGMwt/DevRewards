(function () {
    angular.module('rewardsApp').controller('rewardsController', ['$scope', 'Rewards', 'Claims', '$rootScope', function ($scope, Rewards, Claims, $rootScope) {
        $scope.rewards = Rewards.query();
        $scope.claimed = [];
        $scope.claim = function (rewardId) {
            var newClaim = new Claims({ userId: 1, rewardId: rewardId });
            newClaim.$save(function (claim, headers) {
                $scope.claimed[rewardId] = true;

                $rootScope.$broadcast('rewardClaimed', {
                    rewardId: claim.rewardId
                });
            });;
        }
    }]);
})();