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

var response_template = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
  + '<soapenv:Body>'
     + '<addResponse xmlns="http://math.pot.ibm.com">'
        + '<addReturn xmlns="">{{result}}</addReturn>'
     + '</addResponse>'
  + '</soapenv:Body>'
+ '</soapenv:Envelope>';
var template = handlebars.compile(response_template);

server.listen(port);
console.log("Server running at " + host + ":" + port);

function add_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[0]+vals[1];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function subtract_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[0]-vals[1];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function multiply_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[0]*vals[1];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function divide_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[0]/vals[1];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function getinputs(req) {
	var inputs = [ (req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['augend'][0]*1), (req.body['soapenv:envelope']['soapenv:body'][0]['math:add'][0]['addend'][0]*1)]
    return inputs;
}
