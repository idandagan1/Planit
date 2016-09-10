var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/local');
var Schema = mongoose.Schema;
var app = express();
var port = process.env.PORT || 3333;

console.log("Server listening on port " + port);

var routes = require('./routes/index');
var map = require('./routes/map');
var list = require('./routes/list');

app.locals.currentUser == "";
app.locals.validator = require('validator');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

//app.use('/users', routes);
app.use('/', routes);
app.use('/list.html', list);
app.use('/map.html', map);

module.exports = app;
app.listen(port);


