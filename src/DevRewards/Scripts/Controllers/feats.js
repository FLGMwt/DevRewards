(function () {
    angular.module('rewardsApp').controller('featsController', ['$scope', 'Feats', function ($scope, Feats) {
        $scope.feats = Feats.query();
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