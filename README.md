# Airvantage connector

## About Airvantage
[Airvantage](https://airvantage.net/) is a cloud-based application facilitating M2M service delivery consisting of the AirVantage Management Service M2M device management application, and AirVantage Enterprise Platform for collecting, sharing, and integration of machine data using API standards, as well as development and deployment of M2M applications.
## Purpose of the scriptr.io connector for Airvantage
The purpose of this connector is to simplify and streamline the way you access Airvantage' APIs from scriptr.io, by providing you with a few native functions that you can directly integrate into your own scripts. Our purpose is to encourage developers to use aivantage in combination with scriptr.io
## Components
- airvantage/authorization/getRequestTokenUrl: This script implements steps 1 and 2 of the Airvantage OAuth Authorization Code Flow Process. It allows another type of aithorization by request an access token using the Eesource Owner Flow Process (getAccessTokenFromCredentials()).
- airvantage/authorization/getAccessToken: This script implements step 3 of the Airvantage OAuth Authorization Code Flow Process.
- airvantage/test/test.js: Is a sample test API that reads the latest 10 history messages representing the (blackInkPrinted and colorInkPrinted) level sent from the "AV Phone Demo" mobile application. Make sure to install the application on your mobile phone and set your account details in the config.js file.
- airvantage/system.js: Is a library that integrates the some basic API calls to the Airvantage System.
