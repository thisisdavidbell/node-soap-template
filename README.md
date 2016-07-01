# node-soap-template
An example of using node to mock up a SOAP service, and using handlebars to quickly and easily parse the SOAP body to show dynamic data.

index.js - this is the node application which will use express to listen for calls. It will expect a POST operation containing a soap message. It will then product a soap response.

mathsservice.wsdl - this is the soap wsdl that will be implemented. 