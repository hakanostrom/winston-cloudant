const winston = require('winston');
const cloudantTransport = require('../winston-cloudant');
const options = require('./options');

// Copy the options.js.example file in this directory, name it options.js
// and add in your IBM Cloud credentials.

// Create winston instance to use for logging
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new cloudantTransport(options)
    ]
});

// Do an info log
logger.log('info', 'Hello distributed log files!');

// // Do another info log
logger.info('Hello again distributed logs');

// log with metadata (warning-level)
logger.warn('With some metadata', {
    tag: 'cloud',
    UserID: 'olle',
    Question: 'Lorem ipsum dolor'
});