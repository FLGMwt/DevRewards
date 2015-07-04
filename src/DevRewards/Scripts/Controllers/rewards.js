(function () {
    angular.module('rewardsApp').controller('rewardsController', ['$scope', 'Rewards', 'Claims', function ($scope, Rewards, Claims) {
        $scope.title = 'Rewards';
        $scope.rewards = Rewards.query();
        $scope.claimed = [];
        $scope.claimedFoo = [];
        $scope.claim = function (rewardId) {
            console.log('claimed: ' + rewardId);
            var newClaim = new Claims({ userId: 1, rewardId: rewardId });
            newClaim.$save(function (claim, headers) {
                $scope.claimedFoo[rewardId] = true;
                $scope.$emit('rewardClaimed', {
                    rewardId: claim.rewardId
                });
            });;
            $scope.claimed[rewardId] = true;
        }
    }]);
})();