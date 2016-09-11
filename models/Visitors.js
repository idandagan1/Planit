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

var Visitors = new Schema({
    Name: {type: String, index:true, required: true},
    Cost: {type: Number, required: false},
}, {collection: 'Visitors'});

module.exports = mongoose.model('Visitors', Visitors);

