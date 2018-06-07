# Cloudant NoSQL DB Transport for Winston

The winston-cloudant module allows you to log your winston messages to IBM's Cloudant NoSQL DB.

    var WinstonCloudant = require('winston-cloudant');
    
    winston.add(WinstonCloudant, {
        url : '...',
        db : '...',
        logstash : true
    });

## Installation

``` bash
  $ npm install winston-cloudant
```

## Usage

Winston-cloudant is just like any other transport for winston. When adding it to winston, it takes some options so that
it knows where to log to Cloudant.

The Cloudant NoSQL DB transport takes the following options:

    url         : Access url including user and password
    db          : Name of the databasename to put logs in
    logstash    : True or false to indicate logging in logstash format

### url

### db

### logstash

# Author

Written by [Håkan Öström](http://www.hakanostrom.se)