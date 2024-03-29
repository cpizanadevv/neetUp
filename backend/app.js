const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
const { ValidationError } = require('sequelize');

const routes = require('./routes');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//*  Security Middleware

// only enables cors in development
if (!isProduction) {
  app.use(cors());
}

//Sets various headers to better secure the app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);
// * Error Handling

// Catches any request that don't match any routes that are defines
// It creates server error with 404 status code
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { 
    message: "The requested resource couldn't be found." 
  };
  err.status = 404;
  next(err);
});


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // Checks if error is a Sequelize error
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// Error formatter
// formats all errors before returning JSON res
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
