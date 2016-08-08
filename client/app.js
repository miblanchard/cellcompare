/* eslint no-unused-vars: 0*/
const app = angular
  .module('cellcompare', [
    'ngRoute',
    'ngMaterial',
    'cellcompare.MainController',
    'cellcompare.DataFactory',
    'cellcompare.planBlock',
  ]);

app.config(['$routeProvider', '$locationProvider', configFunction]);

function configFunction($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './partials/main.html',
      controller: 'MainController',
    });
}
