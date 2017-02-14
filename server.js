var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

//middlewear
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('index.html')
});

//port listener
app.listen(port, function() {
  console.log(port);
});
