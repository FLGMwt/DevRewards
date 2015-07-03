(function () {
    angular.module('rewardsServices', [])
    .factory('Rewards', function () {
        return {
            all: function () {
                return [
                    { Name: 'name1', Description: 'Description 1', PointValue: 10 },
                    { Name: 'name5', Description: 'Description 5', PointValue: 50 },
                    { Name: 'name2', Description: 'Description 2', PointValue: 20 },
                    { Name: 'name3', Description: 'Description 3', PointValue: 30 },
                    { Name: 'name4', Description: 'Description 4', PointValue: 40 },
                ];
            }
        };
    });
})();