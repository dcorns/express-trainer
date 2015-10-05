/**
 * user
 * Created by dcorns on 10/5/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String
});

module.exports = mongoose.model('user', UserSchema);