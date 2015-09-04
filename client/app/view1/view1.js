'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Controller',
    controllerAs: 'View1Ctrl'
  });
}])

.controller('View1Controller', ['$scope', '$http', function($scope, $http) {

  var thisController = this;

  this.learnMore = function() {
    console.log("Learn more clicked!");
  };

  this.sendMessage = function() {
    $http.post('http://5971dd36.ngrok.io/text-message', {
      sendToNumber: this.sendToNumber,
      message: this.message
    })
    .then(function(response) {
      // this callback will be called asynchronously when the response is available
      console.log("success!", response);
      thisController.success = true;
    }, function(response) {
      // called asynchronously if an error occurs or server returns response with an error status.
      thisController.error = true;
      console.error(response);
    })
  };

  this.sendPhoneMessage = function() {
    $http.post('http://5971dd36.ngrok.io/phone-message', {
      sendToNumber: this.sendToNumber2,
      message: this.phoneMessage
    })
    .then(function(response) {
      thisController.success2 = true;
      // this callback will be called asynchronously when the response is available
      console.log("success!", response);
    }, function(response) {
      // called asynchronously if an error occurs or server returns response with an error status.
      thisController.error2 = true;
      console.error(response);
    })
  };
}]);