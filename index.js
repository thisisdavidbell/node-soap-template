var express = require('express');
var handlebars = require('handlebars');
var xmlparser = require('express-xml-bodyparser')

var port = 80;
var host = "localhost";
var server = new express();

server.use(xmlparser());

server.post('/add', add_function);
server.post('/subtract', subtract_function);
server.post('/multiply', multiply_function);
server.post('/divide', divide_function);

server.listen(port);
console.log("Server running at " + host + ":" + port);

function add_function(req, res) {
  res.send(req.body);
// this acts the same, but you cant use quotes using this technique:  console.log(req.body.soapenvenvelope);
  console.log(req.body);
  console.log(req.body['soapenv:envelope']);
};

function subtract_function(req, res) {
  var vals = getinputs(req); 

  var result = vals[0]-vals[1];


  res.send("<some>in subtract function</some> " + result);
  

/*  console.log("#### req.body ####");
  console.log(req.body);

  console.log("\n#### req.body['soapenv:envelope']");
  console.log(req.body['soapenv:envelope']);

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body']");
  console.log(req.body['soapenv:envelope']['soapenv:body']);

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body'][0]");
  console.log(req.body['soapenv:envelope']['soapenv:body'][0]);

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body'][0]['math:add']");
  console.log(req.body['soapenv:envelope']['soapenv:body'][0]['math:add']);

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]");
  console.log(req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]);

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend']");
  console.log(req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend']);  

  console.log("\n#### req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend'][0]");
  console.log(req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend'][0]);  
*/  
};

function multiply_function(req, res) {
  res.send("in multiply function");
};

function divide_function(req, res) {
  res.send("in divide function");
};

function getinputs(req) {
	var inputs = [ (req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend'][0]*1), (req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['addend'][0]*1)]
    return inputs;
}
