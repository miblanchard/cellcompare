angular
	.module('cellcompare.DataFactory', ['ngRoute'])
	.factory('DataFactory', ['$http', dataFactory]);

function dataFactory ($http) {
	return {
		fetch: function(){
			return $http.get('/data');
		},
	};
}
