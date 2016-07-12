# node-soap-template
An example of using node to mock up a SOAP service, and using handlebars to quickly and easily parse the SOAP body to show dynamic data.

index.js - this is the node application which will use express to listen for calls. It will expect a POST operation containing a soap message. It will then product a soap response.

mathsservice.wsdl - this is the soap wsdl that will be implemented. 

Order of steps followed in project:
* Call existing accounts service with postman, showing you can call soap from REST client
* Establish example request and response bodies using SoapUI, showing you don't need actual back end to establish these.
* Create accounts service using node
* Call in soapui
* Use in APIC as soap to soap
* Use in APIC as soap to rest 
