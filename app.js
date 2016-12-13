/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express'),
    fileSystem = require('fs'),
    path = require('path');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

var plistFilePath = path.join(__dirname, '/app/manifest.plist');
var ipaFilePath = path.join(__dirname, '/app/wealthidea.ipa');

app.get('/app/scb-poc',function(req,res){

	  res.set('Content-Type', 'text/xml plist');
	  res.sendFile(plistFilePath);
});

app.get('/app/wealthidea.ipa',function(req,res){

		res.set('Content-Type','application/octet-stream ipa');
		res.sendFile(ipaFilePath);
});


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// app.listen(8080, 'localhost', function() {

// 	// print a message when the server starts listening
//   console.log("server starting on 8080" );
// });
