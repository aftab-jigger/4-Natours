const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Built-in, Custom Middlwares & Third Part Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hi, I'm from middleware ");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
app.use(morgan('dev'));
// ===========================================

// ================= Routes =============================

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
