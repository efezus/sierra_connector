var config = require("./config.js");
var airvantageClient = require("./airvantageClient.js");
var tokenManager = require("./authorization/TokenManager.js");

/**
 * This method returns a paginated list of systems with their complete details.  
 * @method findSystems
 * @return {Object} paginated list of systems with their complete details
 */
function findSystems(filters){

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var fields = "uid,name,gateway,subscription";
    var url = config.airVantageApiUrl + "systems";
    var httpObj = {
        url: url,
       "content-type": "application/json",
        method: "GET",
        params: {fields: fields}
    };

	if (filters) {
        
        for (var key in filters) {
            httpObj.params[key] = filters[key];
        }
    }
	
    var result = airvantageClientObject.callApi(httpObj);
    return result
}

/**
 * Returns detailed information about the specified system.  
 * @method getSystemDetails
 * @param {String}  uid : System uid
 * @return {Object} detailed information about the specified system
 */
function getSystemDetails(uid){

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "systems/" + uid;
    var httpObj = {
        url: url,
        method: "GET"
    };
    var result = airvantageClientObject.callApi(httpObj);
    return result
}

/**
 * Returns detailed information about the specified system.  
 * @method getSystemMessages
 * @param {String}  uid : System uid
 * @return {Object} detailed information about the specified system
 */
function getSystemMessages(sustemUID){

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "systems/" + sustemUID + "/messages";
    var httpObj = {
        url: url,
        method: "GET"
    };
    var result = airvantageClientObject.callApi(httpObj);
    return result
}

/**
 * Retrieve the list of past messages.  
 * @method getSystemMessageDetails
 * @param {String}  systemUID : system uid
 * @param {String}  messageUID : message uid 
 * @return {Object} the list of past messages
 */
function getSystemMessageDetails(systemUID, messageUID){

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "systems/" + systemUID + "/messages/" + messageUID;
    var httpObj = {
        url: url,
        method: "GET"
    };
    var result = airvantageClientObject.callApi(httpObj);
    return result
}

/**
 * Return last data points sent by the 
 * @method getLastDataPoints
 * @param {String} uid: the device's uid
 * @return { <metric> : {value:<some_value>, timestamp:<timestamp>}, <metric>:{...}. ... }
 */
function getLastDataPoints(uid) {

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "systems/" + uid + "/data";
    var httpObj = {
        url: url,
        method: "GET"
    };

    var result = airvantageClientObject.callApi(httpObj);
    return result
}

/**
 * Returns detailed information about the specified gateway.
 * @method getGatewayDetails
 * @param {String}  uid : gateway uid
 * @return {Object} detailed information about the specified gateway
 */
function getGatewayDetails(uid){

    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "gateways/" + uid;
    var httpObj = {
        url: url,
        method: "GET"
    };
    var result = airvantageClientObject.callApi(httpObj);
    return result
}
