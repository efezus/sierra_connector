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
 * Return last data points sent by the given device
 * @function getLastDataPoints
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
 * @function sendApplicativeCommand
 * @param {Object} [dto]
 * @param {Boolean} [dto.notify]: optional, if true, sends an email notification to the user when the operation finishes.
 * @param {String} [dto.callback] : optional callback url that receives updates on the operation satus. Defaults to config.callback
 * @param {Number} [dto.scheduledTime] : optional, timestamp, Date time when the operation will be launched. If not specified starts immediately.
 * The time must be less than 30 days.
 * @param {Number} [dto.timeout] : "timeout", optional, The date for which the operation is considered as expired. Defaults to 7 days
 * @param {Boolean} [dto.requestConnection] : if true, will try to notify the system
 * @param {String} [dto.protocol] : if specified, message will be sent thought this protocol. Defaults to Airvantage configuration
 * @param {Object} [dto.systems] 
 * @param {String} [dto.systems.label] : all systems linked to the label will be incorporated to the operation
 * @param {Array} [dto.systems.uids] : ["uid1", ...],
 * @param {String} [dto.systems.dependsOn]
 * @param {String} [dto.systems.operation] : optional,  current operation starts after the operations specified by this fied are finished. 
 * @param {String} [dto.systems.operation.states] : optiona, one of ["FAILURE", "SUCCESS", "CANCELLED"]
 * @param {String} [dto.commandId] : the command id (e.g. "start")
 * @param {Object} [dto.parameters] : {key/value}
 * @return {Object} {operation: <operation_id>}
 * @throws {Error}
 */
function sendApplicativeCommand(dto) {
    
    if (!dto || !dto.commandId || !dto.systems || (!dto.systems.uids && !dto.systems.label)) {
        
        throw {
            errorCode: "Invalid_Parameter",
            errorDetail: "dto.commandId and dto.systems.uids or dto.systems.label are mandatory"
        };
    }
    
    dto.callback = dto.callback ? dto.callback : config.callback;
    var airvantageClientObject = new airvantageClient.AirvantageClient();
    var url = config.airVantageApiUrl + "operations/systems/command";
    var httpObj = {
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        params: dto
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
