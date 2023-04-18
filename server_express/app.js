var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require("cors");

const register = require("./auth/register");
const login = require("./auth/login");
const addTask = require("./routes/add");
const updateTask = require("./routes/update");
const deleteTask = require("./routes/delete");
const getTask = require("./routes/get");

var indexRouter = require('./routes/index');
var app = express();

app.use(cors({ origin: "*" }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use("/", indexRouter);
app.use("/register", register);
app.use("/login", login);
app.use("/add", addTask);
app.use("/update", updateTask);
app.use("/delete", deleteTask);
app.use("/get", getTask);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
