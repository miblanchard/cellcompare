/*jshint multistr: true */
angular
  .module('cellcompare.MainController', ['ngRoute','cellcompare.DataFactory'])
	.controller('MainController', ["$scope", "DataFactory", MainController]);

function MainController($scope, DataFactory) {
  $scope.title = "Compare Cell Phone Plans";
  DataFactory.fetch().then(results => {
    console.log(results.data);
    $scope.plans = results.data;
  });
  $scope.sorter = '';
  $scope.contractType = '';
  $scope.carrierName = '';
}
