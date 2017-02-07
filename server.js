var express = require('express');
var app = express();
var port = 3001;

//middlewear
app.use(express.static('public'));


//port listener
app.listen(3001, function() {
  console.log(port);
});
