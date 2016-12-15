'use strict';
const express = require('express')
const fileSystem = require('fs')
const path = require('path')
const cfenv = require('cfenv')
const app = express()
//set public as the static resource
app.use(express.static(__dirname + '/public'))
//set plist and ipa path
const appPath = '/app/'+ process.env.npm_package_config_appName +'.ipa'
const plistFilePath = path.join(__dirname, '/app/manifest.plist')
const ipaFilePath = path.join(__dirname, appPath)
//response to download action
app.get('/app/download_app',function(req,res){
	  res.set('Content-Type', 'text/xml plist')
	  res.sendFile(plistFilePath)
})
//transfer app stream
app.get(appPath,function(req,res){
		res.set('Content-Type','application/octet-stream ipa')
		res.sendFile(ipaFilePath)
})
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv()
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
})
