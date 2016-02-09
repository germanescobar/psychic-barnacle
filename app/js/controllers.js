(function() {
  var app = angular.module("app.controllers", []);
  var ref = new Firebase("https://contactos-mir.firebaseio.com/contacts");

  app.controller("ContactsCtrl", ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    $scope.contacts = $firebaseArray(ref);
  }]);

  app.controller("ContactCtrl", ['$scope', '$location', '$firebaseArray', '$routeParams', function($scope, $location, $firebaseArray, $routeParams) {
    $scope.contacts = $firebaseArray(ref);
    
    $scope.contact = {};
    if ($routeParams.id) {
      $scope.contacts.$loaded().then(function() {
        $scope.contact = $scope.contacts.$getRecord($routeParams.id);
      });
    }

    $scope.save = function() {
      if ($scope.contact.$id) {
        $scope.contacts.$save($scope.contact);
      } else {
        $scope.contacts.$add($scope.contact); 
      }
      
      $location.path("/contacts");
    };

    $scope.destroy = function() {
      if (confirm("¿Are you sure?")) {
        $scope.contacts.$remove($scope.contact);
        $location.path("/contacts");   
      }
    }
  }]);
})();