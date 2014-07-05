/*
    Create new person object
*/
var Person = function(vorname, nachname){
    return {
        Vorname: vorname,
        Nachname: nachname
    };
};

/*
    Configure Angular
*/
angular
    .module('myApp', ['ngRoute'])
    /*
        Configure accessible routes
        These will be accessed from browser
    */
    .config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                // default route
                redirectTo: '/welcome'
            })
            .when('/welcome', {
                templateUrl: 'templates/welcome.html',
                controller: 'Info'
            })
            .when('/info', {
                templateUrl: 'templates/info.html',
                controller: 'Info'
            })
            .when('/imprint', {
                templateUrl: 'templates/imprint.html',
                controller: 'Imprint'
            })
            .when('/404', { templateUrl: 'templates/404.html' })
        .otherwise({ redirectTo: '/404' });

       $locationProvider.html5Mode(false);
    }])
    /*
        Define controllers
        Each controller has it's own scope
        Scopes are used to transfer models data to templates
    */
    .controller('Main', function($scope){
        $scope.Breadcrumbs = [];
        $scope.$on('bc_route_changed', function(e, args) {
            if (!args)
                return;
            var n = args.name !== '/' ? args.name.replace(/\//,'') : args.name;
            $scope.Breadcrumbs.push({
                'name': n,
                'uri': args.uri
            });
        });
    })
    .controller('Imprint', function($scope){

    })
    .controller('Info', function($scope){

    })
    /*
        Persons Controller
    */
    .controller('Details', function($scope, $http){
        $scope.Persons = [];
        $scope.ErrorMessage = '';

        /*
            Add new person to server and to local array
        */
        $scope.add = function(vorname, nachname){
            if(!vorname) 
                return $scope.ErrorMessage = 'Enter a "vorname", please!';
            
            var newPerson = Person(vorname, nachname);
            var personId = vorname + '_' + nachname;
            newPerson.id = personId;

            // add to server storage
            $http.post('/persons', newPerson)
            .success(function(data) {
                $scope.Persons.push(newPerson);
            }).error(function(err) {
                console.log(err);
            });
        };
        /*
            Fetch all persons from server
        */
        $scope.sync = function() {
            $scope.Persons = [];
            // get all from server storage
            $http.get('/persons').success(function(data) {
                for (var i = data.length - 1; i >= 0; i--) {
                    $scope.Persons.push(data[i]);
                };
            });
        };
        /*
            Remove single person object from server and local array
        */
        $scope.remove = function(person) {
            // remove from server storage
            $http.delete('/persons/' + person.id)
            .success(function(data) {
                var idx = $scope.Persons.indexOf(person);
                $scope.Persons.splice(idx, 1);
            }).error(function(err) {
                console.log(err);
            });
        };
    })
    /*
        Events
    */
    .run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function(e, args) {
            console.log(args);
            $rootScope.$broadcast('bc_route_changed', { 
                name: args.$$route.originalPath,
                uri: args.$$route.originalPath
            });
        });
    });
