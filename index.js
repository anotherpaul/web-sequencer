'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
//app.use('/content', express.static(__dirname + '/content'));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

var server = app.listen(8000, function() {
  console.log('Listening on port %d', server.address().port);
});
