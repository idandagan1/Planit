import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import userApi from './server/routes/user';
import sitesApi from './server/routes/sites';
import listApi from './server/routes/list';
import hbs from 'express-handlebars';

mongoose.connect('localhost:27017/local');

const app = express();
const port = process.env.PORT || 3000;

app.locals.currentUser = null;

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts`
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
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

app.use('/', userApi);
app.use('/list', listApi);
app.use('/sites', sitesApi);

// error handle
app.use((err, req, res, next) => {
    console.error(err);
    return res.render('error');
})

// 404
app.use((req, res, next) => {
    return res.render('notfound');
})

// start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
/*./mongod --bind_ip localhost*/
