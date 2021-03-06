var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const User = require("./models/User");
// routes - port - app
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var port = process.env.PORT || '3001';
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

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

//connecting to mongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/moon_child_db");


// server listening
app.listen(port, () => {
  console.log("🌕  Server listening on port" + port);
  
});

module.exports = app;
