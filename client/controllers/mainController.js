angular
  .module('cellcompare.MainController', ['ngRoute'])
	.controller('MainController', ["$scope", MainController]);


function MainController($scope) {
  $scope.title = "Compare Cell Phone Plans";
  //$scope.name = UserFactory.name;
  //MessageFactory.fetch().then(results => $scope.messages = results.data);
  $scope.filterby = '';
  $scope.contractType = '';
  $scope.carrierName = '';
}
