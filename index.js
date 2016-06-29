var express = require('express');
var handlebars = require('handlebars');

var port = 80;
var host = "localhost";
var server = new express();

server.post('/add', function(req, res) {
  res.send("in add function");
});

server.listen(port);
console.log("Server running at " + host + ":" + port);
