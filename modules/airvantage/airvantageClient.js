var config = require("./config.js");
var http = require("http");
var tokenMgr = require("./authorization/TokenManager.js");

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
    return response;
    if (response.status == "401" && response.body.indexOf("expired") > -1) {
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
  
  if (params.params) {
    params.params = this._paramsToString(params.params);
  }else{
    params.params = this._paramsToString({});
  }
  
  params["headers"] = params["headers"]  ? params["headers"] :{};
  params["params"]["access_token"] = this.accessToken;
  
  var response = http.request(params);
  //console.log("Received following response from fibit : " + JSON.stringify(response));
  if (response.status >= "200" && response.status < "300") {
    return JSON.parse(response.body);
  }else {
    throw response;
  }
};

AirvantageClient.prototype._refreshToken = function() {
 
  console.log("Refreshing token for " +  this.clientId);
  tokenMgr.refreshAccessToken(this.clientId);
  this.accessToken = tokenMgr.getPersistedTokens(this.clientId).accessToken;
};
  
AirvantageClient.prototype._handleError = function(response) {
    
  var errorObj = "";
  try {

    errorObj = JSON.parse(response.body);
    errorObj = errorObj.errors;
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

/*
 * Transform all Numeric and boolean parameters to string so they can be passed to http.callApi
 * (shallow only)
 */
AirvantageClient.prototype._paramsToString = function(params) {
  
  var newParams = {};
  for (var p in params) {
    
    if (typeof(params[p]) != "object") {
    	newParams[p] = "" +  params[p];
    }else {
      newParams[p] = params[p];
    }
  }
  
  return newParams;
};			