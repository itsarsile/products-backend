const express = require('express');
const winston = require('winston');
const mainRoutes = require('./src/routes/index');
const sql = require('./src/configs/db.config');

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

app.use(express.json());
app.use('/', mainRoutes);
// app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => {
  logger.log('info', `App listening on port ${port}`);
});
