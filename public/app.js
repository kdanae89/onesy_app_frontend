var app = angular.module('ProjectOnesie', []);

app.controller('mainController', ['$http', function($http) {

  this.url = 'http://localhost:3000';
  this.user = {};
  var controller = this;
  controller.user= {};
  this.onsey = {};



  // Post request for login, adds token to local storage
  this.login = function(logUser) {
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: logUser.username, password: logUser.password }}
    }).then(function(response) {
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
      console.log(this.user);
      document.getElementById("logIn").reset();
      this.showUser();
    }.bind(this));
  }

// Post request for creating a user
  this.register = function(newUser) {
    $http({
      method: 'POST',
      url: this.url + '/users',
      data: { user: { username: newUser.username, password: newUser.password }}
    }).then(function(response) {
      console.log(response);
      document.getElementById("register").reset();
    }.bind(this));
  }

  // Get request here!!!!!! Gets current user
  this.showUser = function() {
    console.log(this.user);
    $http({
      method: 'GET',
      url: this.url + '/users/' + this.user.id,
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
    }.bind(this));
  }



  // Put request to edit a user's info
  this.edit = function(editMe) {
    $http({
      method: 'PUT',
      url: this.url + '/users/' + this.user.id,
      data: { user: { username: editMe.username, password: editMe.password }},
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
    }).then(function(response) {
      this.user = response.data.user;
      document.getElementById("editUser").reset();
    }.bind(this));
  }

// Create a new onesy for a user
  this.createOnesy = function(newOnesy) {
    $http({
      method: 'POST',
      url: this.url + '/users/' + this.user.id + '/onesies',
      data: { onesy: { size: newOnesy.size, color: newOnesy.color }}
    }).then(function(response) {
      console.log(response);
    }.bind(this));
  }


}]);
