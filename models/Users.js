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

var Users = new Schema({
    UserName: {type: String, index:true, unique:true, required: true},
    Password: {type: String, required: true},
    Email: {type: String},
    Items:[]
}, {collection: 'Users'});

module.exports = mongoose.model('Users', Users);