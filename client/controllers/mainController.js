angular
  .module('cellcompare.MainController', ['ngRoute', 'Codesmith.MessageFactory', 'Codesmith.UserFactory'])
	.controller('HomeController', ["$scope", 'UserFactory', 'MessageFactory', HomeController]);


function MainController(myScope, UserFactory, MessageFactory) {
  myScope.unit = "Unit 10 Prototype";
  myScope.name = UserFactory.name;
  MessageFactory.fetch().then(results => myScope.messages = results.data);
  myScope.filterby = '';
  myScope.searchTerm = '';
  myScope.messageToSend = '';
  myScope.submit = () => {
  	MessageFactory.post(myScope.name, myScope.messageToSend)
  	.then(result => {
  		myScope.messages = [result.data].concat(myScope.messages);
  		myScope.messageToSend = '';
  	});
  };
}
