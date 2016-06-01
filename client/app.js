var app = angular
  .module('myApp', [
    'ngRoute',
    'cellcompare.MainController'
  ]);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './partials/main.html',
      controller: 'MainController',
    });
}
