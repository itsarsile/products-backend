const express = require('express');
const winston = require('winston');
const createHttpError = require('http-errors');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const mainRoutes = require('./src/routes/index');

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }),
    new winston.transports.Console(),
  ],
});
app.use(cors());
app.use(xss());
app.use(helmet());
app.all('*', (req, res, next) => {
  next(new createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  const messageError = error.message || 'Internal server error';
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});

app.use(express.json());
app.use('/', mainRoutes);
// app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => {
  logger.log('info', `App listening on port ${port}`);
});
