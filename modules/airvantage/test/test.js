var config = require("../config.js");
var system = require("../system.js");
var result = [["Request", "Black Ink Level", "Color Ink Level"]];

var airvantageClient = require("../airvantageClient.js");
var tokenManager = require("../authorization/TokenManager.js");

var accessTokenSetResult = tokenManager.getAccessTokenFromCredentials();
var systemResults = system.findSystems();

var systemUID = systemResults.items[0].uid;
var systemMessages = system.getSystemMessages(systemUID);
var count = 0;
for(var x=0; x<10; x++){
	var systemMessageUID = systemMessages.messages[x].uid;  
	var messageDetails = system.getSystemMessageDetails(systemUID, systemMessageUID);
    if(messageDetails["data"] && messageDetails["data"]["phone.custom.3"] && messageDetails["data"]["phone.custom.4"]){
      count ++;
      var blackInkPrinted = messageDetails["data"]["phone.custom.3"][0]["value"];
      var colorInkPrinted = messageDetails["data"]["phone.custom.4"][0]["value"];  
      result.push([count, blackInkPrinted, colorInkPrinted]);
    }
}
return result;
