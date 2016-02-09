(function() {
  var app = angular.module("app", [
    'ngRoute',
    'app.controllers',
    'firebase'
    ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        redirectTo: "/contacts"
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      })
      .when('/new-contact', {
        templateUrl: 'views/contact-form.html',
        controller: 'ContactCtrl'
      })
      .when('/contacts/:id', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/contacts/:id/edit', {
        templateUrl: 'views/contact-form.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        templateUrl: 'views/404.html'
      });

  }]);
})();