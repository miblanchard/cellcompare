/* jshint multistr: true */
angular
	.module('cellcompare.planBlock', ['ngRoute', 'ngMaterial'])
  .directive('planBlock', planBlock);

function planBlock() {
  return {
    restrict: 'E',
    template: `<div class="planContainer">
                <div class="name">{{plan.carrier}}</div>
                <div class="name">{{plan.name}}</div>
                <hr/>
                <p>{{plan.dataPlan}}</p><p>{{plan.price}}</p></br>
                <div class="hidden"><p>{{plan.priceNum}}</p><p>{{plan.dataSize}}</p><p>{{plan.carrier}}</p><p>{{plan.contractPlan}}</p></div>
              </div>`
  };
}
