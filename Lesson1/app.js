var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//3. Declare router (1 collection - 1 router)
var categoryRouter = require('./routes/categories'); //location: routes/categories.js
var productRouter = require('./routes/products')

var app = express();

//1. config mongoose library (connect and work with database)
//1A. import library
var mongoose = require("mongoose");
//1B. set mongodb connection string + database
var uri = "mongodb://localhost:27017/Demo"
//1C. connect to mongodb
mongoose.connect(uri)
  .then(() => console.log("connect successfully"))
  .catch((err) => console.log("Error: " + err));

//2. config body-parser library (get data from client-side)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// 3B. declare URL (path) of routers
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

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

module.exports = app;
