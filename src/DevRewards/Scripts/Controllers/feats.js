(function () {
    angular.module('rewardsApp').controller('featsController', ['$scope', 'Feats', function ($scope, Feats) {
    //angular.module('rewardsApp').controller('featsController', ['$scope', function ($scope) {
        $scope.feats = Feats.query();
        //$scope.test = 'Feats test';
        //$scope.feats = [
        //    { id: 1, name: 'feattest', pointsValue: 100,  description: 'description for feat' },
        //    { id: 2, name: 'feattest2', pointsValue: 100, description: 'description for feat' }
        //];

        //$scope.title = 'Rewards';
        //$scope.rewards = Rewards.query();
        //$scope.claimed = [];
        //$scope.claim = function (rewardId) {
        //    var newClaim = new Claims({ userId: 1, rewardId: rewardId });
        //    newClaim.$save(function (claim, headers) {
        //        $scope.claimed[rewardId] = true;

        //        $rootScope.$broadcast('rewardClaimed', {
        //            rewardId: claim.rewardId
        //        });
        //    });;
        //}
    }]);
})();