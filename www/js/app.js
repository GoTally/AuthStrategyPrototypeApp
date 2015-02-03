// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

app.controller("BaseController", function() {
  this.userId = '';
  this.response = '';

  this.login = function() {
    var self = this;
    console.log('login');
    facebookConnectPlugin.login(['email', 'user_friends'], function(response) {
      self.response = JSON.stringify(response);
      self.userId = response.authResponse.userID;
      // Make API call
    });
  };

  this.getLoginStatus = function() {
    var self = this;
    console.log('get login status');
    facebookConnectPlugin.getLoginStatus(function(response) {
      self.response = JSON.stringify(response);
      self.userId = response.authResponse.userID;
    });
  };
});
