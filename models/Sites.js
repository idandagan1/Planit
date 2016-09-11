/**
 * Created by idandagan1 on 10/09/2016.
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/local');
var Schema = mongoose.Schema;

var siteSchema = new Schema({
    SiteName: {type: String, index:true, unique:true, required: true},
    Address: {type: String, required: true},
    Visitors:[]
}, {collection: 'Sites'});

module.exports = mongoose.model('Sites', siteSchema);