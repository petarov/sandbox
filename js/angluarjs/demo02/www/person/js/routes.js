angular
    .module('appRoutes', [])
    
    .run(function($rootScope, $location){
        $rootScope.menuActive = function(url, exactMatch){
            if (exactMatch){
                return $location.path() == url;
            }
            else {
                return $location.path().indexOf(url) == 0;
            }
        }
    });