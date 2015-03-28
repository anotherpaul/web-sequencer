'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});
//app.use('/content', express.static(__dirname + '/content'));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

var server = app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Listening on port %d', server.address().port);
});
