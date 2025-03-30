var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoute = require('./routes/authRoute');
var userRoute = require('./routes/userRoute');
var postsRoute = require('./routes/postsRoute');
var commentRoute = require('./routes/commentRoute');
var categoriesRouter = require('./routes/categoriesRouter');
var resetPassword = require('./routes/resetPassword');
require("dotenv").config();
const connectDB = require("./config/plog-api1");
const { notFound, errorMiddleware } = require('./middlewares/error');
const cors = require('cors');

const securityMiddleware = require('./middlewares/securityMiddleware');

// Connect to MongoDB
connectDB();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(securityMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comment', commentRoute);
app.use('/api/categories', categoriesRouter);
app.use('/api/resetPassword', resetPassword);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorMiddleware);

module.exports = app;
