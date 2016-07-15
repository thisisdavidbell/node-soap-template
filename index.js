var express = require('express');
var handlebars = require('handlebars');
var xmlparser = require('express-xml-bodyparser')

var port = 80;
var host = "localhost";
var server = new express();

server.use(xmlparser());

server.post('/maths', maths_function);
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

function maths_function(req, res) {
  var vals = getinputs(req); 
//  var result = vals[1]+vals[2];
//  console.log(vals[0]);

  var result = 0;
  switch(vals[0]) {
  	case 'add':
      result = vals[1]+vals[2];
  	  break;
  	case 'subtract':
      result = vals[1]-vals[2];
  	  break;
  	case 'multiply':
      result = vals[1]*vals[2];
  	  break;
  	case 'divide':
      result = vals[1]/vals[2];
  	  break;
  	default:
      result = -1; 
  }

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function add_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[1]+vals[2];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function subtract_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[1]-vals[2];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function multiply_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[1]*vals[2];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function divide_function(req, res) {
  var vals = getinputs(req); 
  var result = vals[1]/vals[2];

  var data = { "result": result};
  var soapresponse = template(data);

  res.send(soapresponse);  
};

function getinputs(req) {
	var operation = Object.keys(req.body['soapenv:envelope']['soapenv:body'][0])[0];
	var name1 = Object.keys(req.body['soapenv:envelope']['soapenv:body'][0][operation][0])[0];
	var name2 = Object.keys(req.body['soapenv:envelope']['soapenv:body'][0][operation][0])[1];
//	console.log(name1 + name2);
	var inputs = [ operation.split(':')[1], (req.body['soapenv:envelope']['soapenv:body'][0][operation][0][name1][0]*1), (req.body['soapenv:envelope']['soapenv:body'][0][operation][0][name2][0]*1)];
    return inputs;
}
