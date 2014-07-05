var myApp = angular.module('myApp', []);

myApp
    .controller('main', function($scope) {
        $scope.vorname = '';
        $scope.nachname = '';
        $scope.serialized = '';
        $scope.Persons = [];

        $scope.show = function(name) {
            alert($scope.vorname || name);
        };
        $scope.show2 = function(name) {
            alert(name);
        };
        $scope.add = function(vorname, nachname) {
            if (vorname && nachname && vorname.length && nachname.length) {
                $scope.Persons.push({
                    id: $scope.Persons.length + 1,
                    vorname: vorname,
                    nachname: nachname,
                    editable: false
                });
                $scope.serialized = JSON.stringify($scope.Persons);
            }
        };
        $scope.remove = function(person) {
            var idx = $scope.Persons.indexOf(person);
            if (idx > 0) {
                $scope.Persons.splice(idx, 1);
                $scope.serialized = JSON.stringify($scope.Persons);
            }
        };
        $scope.rename = function(person, vorname, nachname) {
            var idx = $scope.Persons.indexOf(person);
            if (idx > 0) {
                $scope.Persons[idx].vorname = vorname;
                $scope.Persons[idx].nachname = nachname;
            }
        };

        $scope.add('Aeryn', 'Sun');
        $scope.add('Double', 'Jeopardy');
    });