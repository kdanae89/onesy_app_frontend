var app = angular.module('ProjectOnesie', []);

//main controller -------------------------->
app.controller('mainController', ['$http', function($http) {

  //function for drag ------------------------------->

  // $(function() {


  setTimeout(function() {
    $(".draggable").draggable({
      helper: 'clone',
      zIndex: 2,
      revert: "invalid"
    });
  }, 500);

  //my variables --------------------------->
  this.url = 'http://localhost:3000';
  this.user = {};
  this.onsey = {};
  this.images = {};

  //ALL JQUERY FOR DRAG N DROP !!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //Img info for appending white onesy on create
  var whiteOnesy = $('<img/>').attr('id', 'whiteOnesy').attr('src', "http://www.clipartkid.com/images/363/baby-onesie-white-trans-free-images-at-clker-com-vector-clip-art-C1WPC8-clipart.png").css("height", "500").css("width", "500").addClass('drag-container');
  // console.log(whiteOnesy);

  //Img info for appending pink onesy on create
  var pinkOnesy = $('<img/>').attr('id', 'pinkOnesy').attr('src', "http://www.clipartkid.com/images/472/light-pink-bodysuit-short-sleeve-baby-n-toddler-8EkNsb-clipart.jpg").css("height", "500").css("width", "500").addClass('drag-container');
  // console.log(pinkOnesy);

  //Img info for appending blue onesy
  var blueOnesy = $('<img/>').attr('id', 'blueOnesy').attr('src', "https://www.towelsandhome.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/s/h/short_sleeve_creeper-baby_blue_1_1.jpg").css("height", "500").css("width", "500").addClass('drag-container');
  // console.log(blueOnesy);

  //Img info for yellow onesy
  var yellowOnesy = $('<img/>').attr('id', 'yellowOnesy').attr('src', "http://www.sawyoo.com/postpic/2015/04/blank-baby-onesie-template_476014.jpg").css("height", "500").css("width", "500").addClass('drag-container');


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
      data: { onesy: { size: newOnesy.size, color: newOnesy.color, user_id: this.user.id }},
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
    }).then(function(response) {
      console.log(response);
      if (response.data.onesy.color == "white") {
        $('#onesyPreview').append(whiteOnesy);
      } else if (response.data.onesy.color == "pastel pink") {
        $('#onesyPreview').append(pinkOnesy);
      } else if (response.data.onesy.color == "baby blue") {
        $('#onesyPreview').append(blueOnesy);
      } else if (response.data.onesy.color == "neutral yellow") {
        $('#onesyPreview').append(yellowOnesy);
      } else {
        console.log("no onesy created");
      }
      $(".droppable").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
          this.dontGo = ((ui.helper).clone())[0];
          // (this.dontGo).addClass('ui.front');
          $(".ui-draggable-handle").addClass('ui.front');
          $(".ui-draggable-handle").css("height", "100px");
          console.log(this.dontGo);
          $('.ui-droppable').append(this.dontGo);
        }
      });
      $(".droppable").droppable("option", "accept", ".draggable");
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
