//Make sure to set the correct configuration in the config.js file before testing.
//This api script reads the latest 10 history messages representing the (blackInkPrinted and colorInkPrinted) level sent from the "AV Phone Demo" mobile application
//This api is used in the testCharts.js. It build the appropriate data structure for the testCharts.js to draw the line chart

var config = require("../config.js");
var system = require("../system.js");
var messenger = require("../messenger");

try {

    var airvantageClient = require("../airvantageClient.js");
    var tokenManager = require("../authorization/TokenManager.js");

    /* 
     * API
     */

    /*
    //retrieve and set the access tocken as a global variable to be use by system.js in order to call the tokenManager.callApi() function
    var accessTokenSetResult = tokenManager.getAccessTokenFromCredentials();

    //This method returns a paginated list of systems with their complete details.  
    //var systemResults = system.findSystems({name: "FE_09of20"});

    //Choose the uid of the first system available
    var systemUID = systemResults.items[0].uid;

    //Retrieve all the messages of the current system described by its systemUID
    var systemMessages = system.getSystemMessages(systemUID);
    var count = 0;

    // Retrieve the last values of the system's data points
    var lastDataPoints = system.getLastDataPoints(systemUID);

    // send a command to a device
    var operation = system.sendApplicativeCommand({systems:{uids: [systemUID]}, commandId: "open"});

    return {

        systemUID: systemUID,
        lastDataPoints: lastDataPoints,
        operation: operation
    };

    */ 


    //var systemResults = system.findSystems();
    //return systemResults;

    /*
     * MQTT
     */

    // option 1 - using the Messenger class
    var localConfig = {

        username: "<GATEWAY_SERIAL_NUMBER>",
        password: "<APPLICATION_PASSWORD_AIRVANTAGE",
        endpoint: "na.airvantage.net" // or eu.airvantage.net
    };

    var data = {

        "ph": 8.5,
        "turbidity": 66,
        "OPR": 870
    };

    var messenger = new messenger.Messenger(localConfig);
    //return messenger.publish(data, {"deviceId": "<DEVICE_ID_OR_IMEI>"});

    // option 2 - using the system.js module
    var someConfig = {

       username: "<GATEWAY_SERIAL_NUMBER>",
        password: "<APPLICATION_PASSWORD_AIRVANTAGE",
        endpoint: "na.airvantage.net" // or eu.airvantage.net
        deviceId: "<DEVICE_ID_OR_IMEI>"        
    };

    // send message
    var sendMsgResult = system.publish(data, someConfig);

    // send taks
    var task = {
        "write" : [{"machine.status" : "on"}]
    };
    
    someConfig.type = "task";

    var sendTaskResult = system.publish(task, someConfig); 
    return {
        sendMsgResult: sendMsgResult,
        sendTaskResult: sendTaskResult
    };
}catch(exception) {
    return exception;
}
