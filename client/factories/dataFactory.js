angular
	.module('cellcompare.DataFactory', [])
	.factory('DataFactory', ['$http', dataFactory]);

function dataFactory($http) {
  return {
    fetch: () => $http.get('/data'),
  };
}
