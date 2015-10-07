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
 * require body-parser for parsing post data
 */
var bodyParser = require('body-parser');
/**
 * require mongoose for communications with the mongo database
 */
var mongoose = require('mongoose');
/**
 * require the user model that was created with mongoose
 */
var User = require('./api/models/user');
/**
 * Require prompt for test mongo features from the server side
 */
var prompt = require('prompt');

function testMongo(){
  prompt.start();
  prompt.get(['userIDorName', 'doWhat', 'newName'], function(err, result){
    var user = new User();
    var userIDorName = result.userIDorName || 'bla';
    console.log(userIDorName, result.doWhat);
    if(userIDorName.substring(0,2) === 'ID'){
      var userID = userIDorName.substring(2);
      switch(result.doWhat){
        case 'View':
          User.findById(userID, function userById(err, user){
            if(err){
              console.log(err);
              return;
            }
            console.log('Requested user: ' + user);
          });
          break;
        case 'Update':
          User.findById(userID, function userById(err, user){
            if(err){
              console.log(err);
              return;
            }
            console.log('Requested user: ' + user);
            user.username = result.newName;
            user.save(function updateUser(err){
              if(err){
                console.log(err);
                return;
              }
              console.log('username now stored as ' + user.username);
            });
          });
          break;
        case 'Delete':
          User.remove({
            _id: userID
          }, function(err, obj) {
            if (err) console.log(err);
            console.log('User Deleted!');
          });
          break;
      }
    }
    else if (result.doWhat !== 'ViewAll' && userIDorName){
      user.username = userIDorName;
      user.save(function saveUser(err){
        if(err) {
          console.log(err);
          return;
        }
        console.log('New user ID: ' + user.id);
      });
    }
    else{//View all
      User.find(function getAllusers(err, users){
        if(err){
          console.log(err);
          return;
        }
        console.log('User List: ' + users);
      });
    }
  });
}

/**
 * Create express application using the express function
 */
var app = express();
/**
 * use for parsing json
 */
app.use(bodyParser.json());
/**
 * Use express routing here and below. Here it is used to execute code for every route request before forwarding to next route
 */
app.route('*')
  .get(function(req, res, next){
    console.log('Request was made');
    next();
  });
/**
 * Setup sending of all static assets to the client. Everything the page itself requests will be routed to the public directory.
 */
app.use(express.static(__dirname + '/public'));

/**
 * Add user routes for json data and CRUD
 */
app.route('/users')
//create a user
  .post(function(req, res) {
    var user = new User();
    console.log('post');
    console.dir(req.body);
    user.username = req.body.username;
    console.log(user.username);
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({
        message: 'User created!'
      });
    });
  })

//get all users
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });

//On routes that end in /users/:user_id
app.route('/users/:user_id')
  .get(function(req, res) {
    console.log('req: ' + req.params.user_id);
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })

  .put(function(req, res) {
    console.dir(req.body);
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      user.username = req.body.username;
      user.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: 'User updated!'
        });
      });
    });
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({
        message: 'User deleted!'
      });

    });
  });

/**
 * Set server port to the environment variable PORT setting or to port 3000
 */
var port = process.env.PORT || 3000;
/**
 * Connect to the mongo database
 */
mongoose.connect('mongodb://localhost/database');
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
  //testMongo();
});