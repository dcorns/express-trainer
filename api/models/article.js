/**
 * article
 * Created by dcorns on 10/6/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    body: String,
    title: String
  }
);

module.exports = mongoose.model('article', ArticleSchema);

