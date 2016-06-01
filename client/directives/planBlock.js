/*jshint multistr: true */
angular
	.module('cellcompare.PlanBlock', ['ngRoute'])
  .directive('PlanBlock', planBlock);

function planBlock () {
	return {
    	restrict: 'E',
      template: '<div class="planContainer">\
                  <div>{{plan.name}}</div>\
                  <p>{{plan.dataPlan}}</p><p>{{plan.price}}</p></br>\
                  <div class="hidden">{{plan.priceNum}}{{plan.dataSize}}{{plan.carrier}}{{plan.contractType}}</div>\
                </div>'
    };
}
