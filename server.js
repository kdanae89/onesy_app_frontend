var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

//middlewear
app.use(express.static('public'));


//port listener
app.listen(port, function() {
  console.log(port);
});
