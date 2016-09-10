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
//var map = require('./routes/map');
//var list = require('./routes/list');
//var jquery = require('./public/javascripts/Jquery');
//var js = require('./public/javascripts/newJs');



app.locals.currentUser == "";
app.locals.validator = require('validator');

// view engine setup
//app.set('port', process.env.PORT || 3000);
//app.engine('html', require('ejs').renderFile);
//app.set('public', path.join(__dirname, 'public'));
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use('/users', routes);
//app.use('/map', map);
//app.use('/list', list);
//app.use(jquery);
//app.use(js);

module.exports = app;
app.listen(port);


