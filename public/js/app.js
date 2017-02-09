var app = angular.module('ProjectOnesie', []);

//main controller -------------------------->
app.controller('mainController', ['$http', function($http) {

  //my variables --------------------------->
  this.url = 'http://localhost:3000';
  this.user = {};
  this.onsey = {};
  this.images = {};

  //Img info for appending white onesy on create
  var whiteOnesy = document.createElement('img');
  whiteOnesy.src = "http://www.clipartkid.com/images/363/baby-onesie-white-trans-free-images-at-clker-com-vector-clip-art-C1WPC8-clipart.png";
  whiteOnesy.setAttribute("height", "500");
  whiteOnesy.setAttribute("width", "500");
  whiteOnesy.setAttribute("id", "droppable");

  //Img info for appending pink onesy on create
  var pinkOnesy = document.createElement('img');
  pinkOnesy.src = "http://www.clipartkid.com/images/472/light-pink-bodysuit-short-sleeve-baby-n-toddler-8EkNsb-clipart.jpg";
  pinkOnesy.setAttribute("height", "500");
  pinkOnesy.setAttribute("height", "500");
  pinkOnesy.setAttribute("id", "droppable");

  //Img info for appending blue onesy
  var blueOnesy = document.createElement('img');
  blueOnesy.src = "https://www.towelsandhome.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/s/h/short_sleeve_creeper-baby_blue_1_1.jpg";
  blueOnesy.setAttribute("height", "500");
  blueOnesy.setAttribute("height", "500");
  blueOnesy.setAttribute("id", "droppable");

  //Img info for yellow onesy
  var yellowOnesy = document.createElement('img');
  yellowOnesy.src = "http://www.sawyoo.com/postpic/2015/04/blank-baby-onesie-template_476014.jpg";
  yellowOnesy.setAttribute("height", "500");
  yellowOnesy.setAttribute("height", "500");
  yellowOnesy.setAttribute("id", "droppable");


//USER ROUTES -------------------------------->

  // Post request for login, adds token to local storage
  this.login = function(logUser) {
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: logUser.username, password: logUser.password }}
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
      console.log(this.user);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('username', JSON.stringify(response.data.user.username));
      localStorage.setItem('userId', JSON.stringify(response.data.user.id));
      document.getElementById("logIn").reset();
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

  // Put request to edit a user's info
  this.edit = function(editMe) {
    console.log("checking user in edit", this.user.id);
    $http({
      method: 'PUT',
      url: this.url + '/users/' + this.user.id,
      data: { user: { username: editMe.username, password: editMe.password }},
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
    }).then(function(response) {
      console.log(response);
      this.user = response.data.username;
      document.getElementById("editUser").reset();
    }.bind(this));
  }

//ONESEY ROUTES --------------------------------->

// Create a new onesy for a user
  this.createOnesy = function(newOnesy) {
    $http({
      method: 'POST',
      url: this.url + '/users/' + this.user.id + '/onesies',
      data: { onesy: { size: newOnesy.size, color: newOnesy.color, user_id: this.user.id }}
    }).then(function(response) {
      console.log(response);
      if (response.data.onesy.color == "white") {
        document.getElementById("onesyPreview").appendChild(whiteOnesy);
      } else if (response.data.onesy.color == "pastel pink") {
        document.getElementById("onesyPreview").appendChild(pinkOnesy);
      } else if (response.data.onesy.color == "baby blue") {
        document.getElementById("onesyPreview").appendChild(blueOnesy);
      } else if (response.data.onesy.color == "neutral yellow") {
        document.getElementById("onesyPreview").appendChild(yellowOnesy);
      } else {
        console.log("no onesy created");
      }
    }.bind(this));
  }

//IMAGE ROUTES --------------------------------->
//image index, show me the images!!!!
  this.allImages = function() {
    $http({
      method: 'GET',
      url: this.url + '/images'
    }).then(function(response) {
      this.images = response.data.images;
      // console.log(this.images);
    }.bind(this));
  }
  this.allImages();

}]);
