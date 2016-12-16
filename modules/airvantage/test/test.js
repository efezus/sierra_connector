//Make sure to set the correct configuration in the config.js file before testing.
//This api script reads the latest 10 history messages representing the (blackInkPrinted and colorInkPrinted) level sent from the "AV Phone Demo" mobile application
//This api is used in the testCharts.js. It build the appropriate data structure for the testCharts.js to draw the line chart

var config = require("../config.js");
var system = require("../system.js");
var result = [["Request", "Black Ink Usage", "Color Ink Usage"]];

var airvantageClient = require("../airvantageClient.js");
var tokenManager = require("../authorization/TokenManager.js");

//retrieve and set the access tocken as a global variable to be use by system.js in order to call the tokenManager.callApi() function
var accessTokenSetResult = tokenManager.getAccessTokenFromCredentials();

//This method returns a paginated list of systems with their complete details.  
var systemResults = system.findSystems();

//Choose the uid of the first system available
var systemUID = systemResults.items[0].uid;

//Retrieve all the messages of the current system described by its systemUID
var systemMessages = system.getSystemMessages(systemUID);
var count = 0;

//loop on all the latest 10 messages
for(var x=systemMessages.messages.length-11; x<systemMessages.messages.length-1; x++){
	var systemMessageUID = systemMessages.messages[x].uid;  
  	
  //retrieve the details of each message
	var messageDetails = system.getSystemMessageDetails(systemUID, systemMessageUID);
    if(messageDetails["data"] && messageDetails["data"]["phone.custom.3"] && messageDetails["data"]["phone.custom.4"]){
      count ++;
      //read the colored and black ink levels from the messages sent
      var blackInkPrinted = parseInt(messageDetails["data"]["phone.custom.3"][0]["value"]);
      var colorInkPrinted = parseInt(messageDetails["data"]["phone.custom.4"][0]["value"]);  
      result.push([count, blackInkPrinted, colorInkPrinted]);
    }
}
//return the results as expected by the google chart set in the testCharts.js
return result;
