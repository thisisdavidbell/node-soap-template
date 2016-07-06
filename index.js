var express = require('express');
var handlebars = require('handlebars');

var port = 80;
var host = "localhost";
var server = new express();

server.post('/add', add_function);
server.post('/subtract', subtract_function);
server.post('/multiply', multiply_function);
server.post('/divide', divide_function);

server.listen(port);
console.log("Server running at " + host + ":" + port);

function add_function(req, res) {
  res.send("in add function");
};

function subtract_function(req, res) {
  res.send("in subtract function");
};

function multiply_function(req, res) {
  res.send("in multiply function");
};

function divide_function(req, res) {
  res.send("in divide function");
};


