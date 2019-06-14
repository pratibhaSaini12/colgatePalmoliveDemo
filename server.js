const express = require('express');
const logger = require('morgan');
var session  = require('express-session');
const nconf = require('nconf');
const path = require('path')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const webpack = require('webpack')
const config = require('./webpack.config')
const validator = require('validator');
//var Sequelize = require("sequelize");
const cookieParser = require('cookie-parser');
// var cors = require('cors')
// const expressSession = require('express-session');
const ejs = require('ejs');
//var passport = require('passport');
const flash    = require('connect-flash');
//var sequelize = new Sequelize();
// var sequelize = require('./config.js')


// Set up the express app
const app = express();
global.config = require('./configuration');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('./TokenValidator')); //middleware to authenticate token
// app.use(require('./controllers/account'));
// configuration ===============================================================
// connect to our database

// require('./passport')(passport); // pass passport for configuration

app.use(express.static(path.join(__dirname, '')));

app.engine('html', ejs.renderFile);
app.set('client', path.join(__dirname, '/file'));
app.set('view engine', 'html');
app.use(cookieParser());
// app.use(cors())
// app.use(expressSession({ secret: 'keyboard cat', rolling: true, resave: true, saveUninitialized: false }));
app.use(flash());
app.use(express.static(path.join(__dirname, '/client')));

app.use('/css', express.static(path.resolve(__dirname, './client/public/css')));
app.use('/images', express.static(path.resolve(__dirname, './client/public/images')));
app.use('/js', express.static(path.resolve(__dirname, './client/public/js')));
// app.use('/javascript', express.static(path.resolve(__dirname, './client/javascript')));
// app.use('/js', express.static(path.resolve(__dirname, '../client/js')));
app.use('/fonts', express.static(path.resolve(__dirname, './client/public/fonts')));
app.use('/build', express.static(path.resolve(__dirname, './build')));
app.use('/resource_images', express.static(path.resolve(__dirname, '../resource_images')));
app.use('/project_file', express.static(path.resolve(__dirname, '../project_file')));
app.use('/attachment_file', express.static(path.resolve(__dirname, '../attachment_file')));
app.use('/user_image', express.static(path.resolve(__dirname, '../user_image')));
app.use('/company_logo', express.static(path.resolve(__dirname, '../company_logo')));
// app.use('/kyc_images', express.static(path.resolve(__dirname, '../kyc_images')));

// Log requests to the console.


app.use(logger('dev'));
app.use(fileUpload());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// required for passport
// app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// app.use(session({
// 	secret: 'vidyapathaisalwaysrunning',
// 	resave: true,
// 	rolling: true,
// 	saveUninitialized: false
//  } )); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routes')(app);
// app.use(require('./TokenValidator'));
// app.get('/dashboard', function(req, res, next){
//
//   if (!req.isAuthenticated()){
//     return res.redirect('/');
//   }
//   next()
// });
// app.get('/leadlist', function(req, res, next){
//   if (!req.isAuthenticated()){
//     return res.redirect('/');
//   }
//   next()
// });

// app.use(require('./userInfoController'))
app.get('*', function (req, res){

  //
   res.sendFile('index.html', { root: path.join(__dirname, './client/public/html') });
})

module.exports = app;
