# Airvantage connector

## About Airvantage
[Airvantage](https://airvantage.net/) is a cloud-based application facilitating M2M service delivery consisting of the AirVantage Management Service M2M device management application, and AirVantage Enterprise Platform for collecting, sharing, and integration of machine data using API standards, as well as development and deployment of M2M applications.

## Purpose of the scriptr.io connector for Airvantage
The purpose of this connector is to simplify and streamline the way you access Airvantage' APIs from scriptr.io, by providing you with a few native functions that you can directly integrate into your own scripts. Our purpose is to encourage developers to use aivantage in combination with scriptr.io.

## Components
- airvantage/authorization/getRequestTokenUrl: This script implements steps 1 and 2 of the Airvantage OAuth Authorization Code Flow Process. It allows another type of aithorization by request an access token using the Resource Owner Flow Process (getAccessTokenFromCredentials()).
- airvantage/authorization/getAccessToken: This script implements step 3 of the Airvantage OAuth Authorization Code Flow Process.
- airvantage/system.js: Is a library that integrates the some basic API calls to the Airvantage System.
- airvantage/test/test.js: Is a sample test API that reads the latest 10 history messages representing the (blackInkPrinted and colorInkPrinted) level sent from the "AV Phone Demo" mobile application. Make sure to install the application on your mobile phone and set your account details in the config.js file.
- airvantage/test/testCharts.js: Is a line chart representation of the response returned from the airvantage/test/test.js API.

## How to use
- Use the Import Modules feature to deploy the airvantage scripts in your scriptr account, in a folder named "modules/airvantage".
- Sign up for an airvantage account (https://na.airvantage.net/)
- Airvantage has [sample application](http://source.sierrawireless.com/airvantage/av/howto/gettingstarted/) to simulate any machine sending data to AirVantage; the name of this application is AV Phone. You can install the AV Phone application from your smartphone store (Google Play or Apple Store ). 
- Install, login to the account, and run the [application](http://source.sierrawireless.com/airvantage/av/howto/gettingstarted/).
- Start data communications from the mobile app by togglling the Send Data switch to On.
- After couple of minuites, run the testCharts.js in order to display the (colored and black ink levels) data sent from the mobile app in a line chart.

## Obtain access and refresh tokens from fitbit
The simplest way to obtain an access tocken and a refresh tocken is by setting the username and the password of the account in the config.js file and the following function. The tockens will be set as global variable in scriptr.io and the authenticaiton will be handled automatically. 
```
//retrieve and set the access tocken as a global variable to be use by system.js in order to call the tokenManager.callApi() function
var accessTokenSetResult = tokenManager.getAccessTokenFromCredentials();
```
## Use the connector
In order to use the minimal features of the connector, you need to import the main library systems.js and use the basic methods implemented.
