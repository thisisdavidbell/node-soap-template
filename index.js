var express = require('express');
var handlebars = require('handlebars');
var xmlparser = require('express-xml-bodyparser')

var port = 80;
var host = "localhost";
var server = new express();

server.use(xmlparser());

server.post('/maths', maths_function);

var response_template = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
  + '<soapenv:Body>'
     + '<{{operation}}Response xmlns="http://math.pot.ibm.com">'
        + '<{{operation}}Return xmlns="">{{result}}</{{operation}}Return>'
     + '</{{operation}}Response>'
  + '</soapenv:Body>'
+ '</soapenv:Envelope>';
var template = handlebars.compile(response_template);

server.listen(port);
console.log("Server running at " + host + ":" + port);

function maths_function(req, res) {
  var vals = getinputs(req); 

  var operation = vals[0];
  var result = 0;
  switch(operation) {
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

  var data = { "result": result, "operation": operation};
  var soapresponse = template(data);

  res.send(soapresponse);  
};


function getinputs(req) {
	var soapbody = req.body['soapenv:envelope']['soapenv:body'][0];
	var operation = Object.keys(soapbody)[0];
	var name1 = Object.keys(soapbody[operation][0])[0];
	var name2 = Object.keys(soapbody[operation][0])[1];
//	console.log(name1 + name2);
	var inputs = [ operation.split(':')[1], (soapbody[operation][0][name1][0]*1), (soapbody[operation][0][name2][0]*1)];
    return inputs;
}
