var winston = require('winston');
var cloudantTransport = require('../winston-cloudant');
var options = require('./options');

// Copy the options.js.example file in this directory, name it options.js
// and add in your IBM Cloud credentials.
winston.add(cloudantTransport, options);

// Do an info log
winston.log('info', 'Hello distributed log files!', function () {
   console.log('First message logged.');
});

// Do another info log
winston.info('Hello again distributed logs', function () {
   console.log('Second message logged.');
});

// log with metadata (warning-level)
winston.warn('With some metadata', { tag: 'cloud' }, function () {
   console.log('Third message logged.');
});