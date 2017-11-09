var config = require("./config.js");
var http = require("http");
var tokenMgr = require("./authorization/TokenManager.js");
var log = require("log"); log.setLevel("info");

/**
 * A generic http client that handles the communication with the AirVantage APIs
 * @class AirvantageClient
 * @constructor AirvantageClient
 */
function AirvantageClient() {

    this.clientId = "";
    this.clientId = config.client_id;
    this.accessToken = tokenMgr.getPersistedTokens(this.clientId).accessToken;
}

/**
 * Invoke a given AirvantageClient API. If response status is 401, the method will try to obtain a new access token using the 
 * current user's refresh token and retry the invocation of the target API.
 * This method can throw exceptions
 * @method callApi
 * @param {Object} params : the parameters of the http call to issue
 * 	{String} params.url : the url of the targeted API
 *	{String} params.method : (optional) the http method to use when invoking the AirvantageClient API
 *	{Object} params.headers: (optional) the http headers to send to the AirvantageClient API
 *	{Object} params.params: (optional) the parameters that are expected by the AirvantageClient API
 */
AirvantageClient.prototype.callApi = function(params) {

    try {   
        return this._callAirvantageApi(params);
    }catch(response) {

        if (response.status == "401") {
            this._refreshToken();
            try {
                return this._callAirvantageApi(params);
            }catch(response) {
                this._handleError(response);
            }
        }else {
            this._handleError(response);
        }    
    }
};

AirvantageClient.prototype._callAirvantageApi = function(params) {
    
    params["headers"] = params["headers"]  ? params["headers"] :{};
    params.headers["Authorization"] = "Bearer " + this.accessToken;
    
    if (params.headers && params.headers["Content-Type"] && params.headers["Content-Type"] == "application/json") {
    	
        params.bodyString = JSON.stringify(params.params);
        delete params.params;
    }

    log.info("/airvantage/client: sending:\n" + JSON.stringify(params));
    var response = http.request(params);
	log.info("/airvantage/client: received:\n" + JSON.stringify(response));
    if (response.status >= "200" && response.status < "300") {
        return JSON.parse(response.body);
    }else {
        throw response;
    }
};

AirvantageClient.prototype._refreshToken = function() {

    log.info("airvantage/airvatangeClient: refreshing token for " +  this.clientId);
    tokenMgr.refreshAccessToken(this.clientId);
    this.accessToken = tokenMgr.getPersistedTokens(this.clientId).accessToken;
};

AirvantageClient.prototype._handleError = function(response) {

    log.error("/airvantage/airvantageClient: got error in response:\n" + JSON.stringify(response));
    var errorObj = "";
    try {

        errorObj = JSON.parse(response.body);
        errorObj = errorObj.errors ? errorObj.errors : errorObj.error;
    }catch(e) {

        try {
            errorObj = JSON.parse(response);
        }catch(e) {
            errorObj = response;
        }
    };

    throw {
        "errorCode": "Airvantage_Invocation_Error",
        "errorDetail": errorObj
    };
};
