angular
  .module('cellcompare.MainController', ['ngRoute', 'ngMaterial', 'cellcompare.DataFactory'])
	.controller('MainController', ['$scope', 'DataFactory', MainController]);

function MainController($scope, DataFactory) {
  $scope.title = 'Compare Cell Phone Plans';
  DataFactory.fetch().then(results => {
    const node = document.getElementsByClassName('spinner')[0];
    if (node.parentNode) node.parentNode.removeChild(node);
    $scope.plans = results.data;
  });
  $scope.sorter = '';
  $scope.contractType = '';
  $scope.carrierName = '';
}
