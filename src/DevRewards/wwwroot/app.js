!function() {
    angular.module("rewardsApp", [ "rewardsServices" ]);
}(), function() {
    angular.module("rewardsApp").controller("rewardsController", [ "$scope", "Rewards", function($scope, Rewards) {
        $scope.title = "Rewards", $scope.rewards = Rewards.query(), $scope.changeName = function() {};
    } ]);
}(), function() {
    "use strict";
    function rewards($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "E",
            templateUrl: "Views/list.html"
        };
        return directive;
    }
    angular.module("rewardsApp").directive("rewards", rewards), rewards.$inject = [ "$window" ];
}(), function() {
    angular.module("rewardsServices", [ "ngResource" ]).factory("Rewards", [ "$resource", function($resource) {
        return $resource("/api/rewards/", {}, {});
    } ]);
}();