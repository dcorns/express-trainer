/**
 * server.js
 * Created by dcorns on 9/27/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
/**
 * Pull in express function
 */
var express = require('express');
/**
 * Create express application using the express function
 */
var app = express();
/**
 * Sending a html page to the client
 */
app.route('*')
  .get(function(req, res, next){
    console.log('Request was made');
    next();
  });
app.route('/')
  .get(function(req, res){
    res.sendFile('index.html', {root: __dirname + '/'});
  });
//app.get('/', function(req, res){
  /**
   * Using res.sendFile specifying the filename and the options object which must include the root property at least
   * __dirname is the directory in which the server is launched
   */
//  res.sendFile('index.html', {root: __dirname + '/'});
//});
/**
 * Set server port to the environment variable PORT setting or to port 3000
 */
var port = process.env.PORT || 3000;
/**
 * Starting up the server by running the express function listen(). We pass the port and a call back to the function.
 */
var server = app.listen(port, 'localhost', function(){
  /**
   * Since server is assigned its value before the callback is called, we are able to access the server variable in the callback itself.
   * var port and host are not needed here but added for instructional purposes.
   */
  var port = server.address().port;
  var host = server.address().address;
  console.log('Server listening at http://' + host + ':' + port);
});