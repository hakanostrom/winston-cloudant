# Cloudant NoSQL DB Transport for Winston

The winston-cloudant module allows you to log your winston messages to IBM's Cloudant NoSQL DB.

    var WinstonCloudant = require('winston-cloudant');
    
    winston.add(WinstonCloudant, {
        url : '...',
        db : '...'
    });

## Installation

``` bash
  $ npm install --save winston-cloudant
```

## Usage

Winston-cloudant is just like any other transport for winston. When adding it to winston, it takes some options so that
it knows where to log to Cloudant.

The Cloudant NoSQL DB transport takes the following options:

    url         : Access url including user and password
    username    : Username for the Cloudant DB instance
    password    : Password for the Cloudant DB instance
    host        : Host for the Cloudant DB instance
    db          : Name of the databasename to put logs in
    logstash    : Write logs in logstash format

### url
The access url for a Cloudant DB instance can be retreived from IBM Cloud portal under _Service credentials_. The url option, if provided, is equivalent to and used in precedence of username/password/host.

### username
The username for a Cloudant DB instance can be retreived from IBM Cloud portal under _Service credentials_.

### password
The password for a Cloudant DB instance can be retreived from IBM Cloud portal under _Service credentials_.

### host
The host for a Cloudant DB instance can be retreived from IBM Cloud portal under _Service credentials_.

### db
The name of the database where logs should be writen. Default if none priveded is _winston-cloudant_.

### logstash
True or false indicating logs to be writen in logstash format. Default is _false_.

# Author

Written by [Håkan Öström](http://www.hakanostrom.se)