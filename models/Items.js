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

var Items = new Schema({
    Name: {type: String, required: true},
    Quantity: Number
}, {collection: 'list-data'});

module.exports = mongoose.model('Items', Items);