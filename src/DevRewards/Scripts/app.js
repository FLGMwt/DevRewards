(function () {
    angular.module('rewardsServices', [
        // Angular modules 
        'ngResource'
        //'ngRoute',
        // Custom modules       

        // 3rd Party Modules        
    ]);
    angular.module('rewardsApp', [
        // Angular modules 
        //'ngRoute',
        // Custom modules
        'rewardsServices'
        // 3rd Party Modules        
    ]);
    
})();