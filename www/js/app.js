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
    facebookConnectPlugin.login(['public_profile', 'email', 'name', 'user_friends'], function(response) {
      self.response = JSON.stringify(response);
      self.userId = response.authResponse.userID;
      self.authToken = response.authResponse.accessToken;
      console.log(self.response)
      facebookConnectPlugin.api(self.userId + "/?fields='id,email,name", [], function(response) {
        self.email = response.email;
        self.first_name = response.name.split(" ")[0];
        self.last_name = response.name.split(" ")[1];
      });
      // Make API call
      $.ajax({
        type: 'POST',
        url: 'https://auth-strategy-api.herokuapp.com/tokens',
        data: {
          uid: self.userId,
          auth_token: self.accessToken,
          first_name: self.first_name,
          last_name: self.last_name,
          email: self.email,
          provider: 'facebook'
        }
      }).done(function(response) {
        console.log(response);
      });
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
