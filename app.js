import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
mongoose.connect('localhost:27017/local');

const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const map = require('./routes/map');
const list = require('./routes/list');

app.locals.currentUser = null;
app.locals.validator = require('validator');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    },
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/'));

app.use('/', routes);
app.use('/list.html', list);
app.use('/map.html', map);

module.exports = app;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

/*./mongod --bind_ip localhost*/
