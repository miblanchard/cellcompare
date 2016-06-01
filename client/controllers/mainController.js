/*jshint multistr: true */
angular
  .module('cellcompare.MainController', ['ngRoute','cellcompare.DataFactory','cellcompare.PlanBlock'])
	.controller('MainController', ["$scope", "DataFactory", 'PlanBlock', MainController]);

function MainController($scope, DataFactory, PlanBlock) {
  $scope.title = "Compare Cell Phone Plans";
  DataFactory.fetch().then(results => {
    console.log(results.data);
    $scope.plans = results.data;
  });
  $scope.filterby = '';
  $scope.contractType = '';
  $scope.carrierName = '';
}
