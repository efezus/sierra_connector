// the default callback url to use when sending commands to devices
var callback = 
    "https://apis.scriptrapps.io/modules/airvantage/callbacks/callback?auth_token=UzIyQTgwRjc2NjpkZW1vOjdBNzhBQjIwMDBCMTk4NkQxRUMwREMzMTcyQzI4NDQz"; 
 
// The URL prefix to all AirVantage's APIs
// Can be https://eu.airvantage.net/api/v1/ or https://na.airvantage.net/api/v1/. Check your subscription
var airVantageApiUrl = "https://na.airvantage.net/api/v1/";

// AirVantage API version to use
var apiVer = "1";

// OAuth 2.0 username used to request an access token using the resource owner flow
var username = "username@someserver.com";

// OAuth 2.0 password used to request an access token using the resource owner flow
var password = "some_password"

// OAuth 2.0: Authorization URI - step1 of OAuth process
var authorizationUrl = "https://na.airvantage.net/api/oauth/authorize";

// OAuth 2.0: Authorization URI - step2 of OAuth process
var accessTokenUrl = "https://na.airvantage.net/api/oauth/token";

// OAuth 2.0 Client ID
var client_id = "9979d53356ca4354824f245369303445"; // example

// Client (consumer) secret
var client_secret = "d1a6b7bacebb49be94c1a679fc58c322"; // example

// The OAuth 2.0 type of the returned credential (can be "code" or "token", the latter is not yet supported)
var response_type = "code";

// Where AirVantage should send the user after the user grants or denies consent. 
// Optional if you have only specified one callback URI for your application in the settings on
var redirect_uri = "https://api.scriptr.io/modules/airvantage/authorization/getAccessToken?auth_token=RzM1RkYwQzc4Mg==";


// generate a random state to be used in the oauth 2 process' steps
var state = (function() {
  return ('xxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  }));
})();

var getAirvantageAuthUrl = (function() {
  return {
    "url": authorizationUrl,
    "state": state
  }
})();

