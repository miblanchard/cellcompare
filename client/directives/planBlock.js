angular
	.module('cellcompare.PlanBlock', ['ngRoute'])
  .directive('PlanBlock', planBlock);

function planBlock () {
	return {
    	restrict: 'E',
      template: '<li> <h3>{{user.name}}</h3> is cool</li>'
    };
}
