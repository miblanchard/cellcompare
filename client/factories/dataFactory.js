angular
	.module('cellcompare.DataFactory', ['ngRoute'])
	.factory('DataFactory', ['$http', dataFactory]);

function dataFactory($http) {
  return {
    fetch: () => $http.get('/data'),
  };
}
