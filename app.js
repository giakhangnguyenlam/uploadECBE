var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
const port = process.env.PORT || 3000;
const db = mongoose.connection;
const { google } = require('googleapis')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const querystring = require('query-string');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

//===============>>> Google analyst<<===================
  



//===============>>> Google analyst<<===================

const home = require("./routes/users");
//===============>>> Customer <<<==================
const customerController = require("./routes/customer");
//===============>>> Customer <<<==================

//===============>>> Product <<<====================
const productController = require("./routes/product");
//===============>>> Product <<<====================

//===============>>> Order <<<===================
const orderController = require("./routes/order");
//===============>>> Order <<<===================

//===============>>> TypeProduct <<<==============
const typeProductController = require("./routes/TypeProduct");
//===============>>> TypeProduct <<<==============

//===============>>> Package <<<==============
const packageController = require("./routes/package");
//===============>>> Package <<<==============

//===============>>> Partner <<<==============
const partnerController = require("./routes/partner");
//===============>>> Partner <<<==============

//===============>>> Price <<<==============
const priceController = require('./routes/price');
//===============>>> Price <<<==============

//===============>>> Session <<<===================
const session = require('express-session');
const MongoStore = require('connect-mongo');
//===============>>> Session <<<===================


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { body } = require('express-validator/check');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());




mongoose.connect('mongodb+srv://EC:123@cluster0.ylvzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//app.use('/customer', customerController);
app.use(session({
  secret: 'ec18a008',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create
  ({ mongoUrl: 'mongodb+srv://EC:123@cluster0.ylvzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
}));




//=========================>> Google API <<<=============================

// const oauth2Client = new google.auth.OAuth2(
// 	"29305240500-4qo4oee7jlsqv3g4f3ojalg3tbt7ea87.apps.googleusercontent.com",
// 	"aCXWtNMnP03iozyCcfui0OL2",
// 	"http://localhost:3000/login/google" 
//   )
//   const scopes = ["https://www.googleapis.com/auth/analytics.readonly",
//   "https://www.googleapis.com/auth/userinfo.profile",
//   "https://www.googleapis.com/auth/userinfo.email"]

//   const url = oauth2Client.generateAuthUrl({
// 	  access_type: "online",
// 	  scope: scopes,
//   });
// app.get('/auth/google', (req, res) => {
// 	res.redirect(url)
// })

// app.get('/login/google', (req, res) => {
// 	oauth2Client.getToken(req.query.code, (err, tokens) => {
// 		viewSelected = ''
// 		if (!err) {
// 			oauth2Client.setCredentials({
// 				access_token: tokens.access_token
// 			})
// 			res.redirect('/setcookie')
// 		} else {
// 			console.log('Error: ' + err)
// 		}
// 	})
// })

// app.get('/setcookie', (req, res) => {
// 	res.cookie('google-auth', new Date())
// 	res.redirect('/success')
// })

// app.get('/success', (req, res) => {
// 	if (req.cookies['google-auth']) {
// 		res.json("Success")
// 	} else {
// 		res.redirect('/')
// 	}
// })

// app.get('/clear', (req, res) => {
// 	viewSelected = ''
// 	res.redirect('/success')
// })
//=========================>> Google API <<<=============================
app.use("/", home);
app.use("/customers", customerController);
app.use('/users', usersRouter);
app.use('/orders', orderController);
app.use('/products', productController);
app.use('/typeproducts', typeProductController);
app.use('/packages', packageController);
app.use('/partners', partnerController);
app.use('/prices', priceController);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, function () {
  console.log('Server is running on PORT',port);
});
module.exports = app;
