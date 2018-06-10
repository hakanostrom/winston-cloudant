const Transport = require('winston-transport');
const Cloudant = require('@cloudant/cloudant');

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class CloudantTransport extends Transport {
    constructor(opts) {
        super(opts);

        // Instantiate using url OR username/password/host
        this.cloudant = Cloudant({
            url: opts.url || 'https://' + opts.username + ':' + opts.password + '@' + opts.host
        });

        // Default database name if none provided
        opts.db = opts.db || 'winston-cloudant';

        // Create database to be sure it exists
        this.cloudant.db.create(opts.db);

        this.db = this.cloudant.use(opts.db);

        // Formatting for Logstash (force to be true/false)
        this.logstash = !!opts.logstash;
    }

    log(level, msg, meta, callback) {
        setImmediate(() => {
            this.emit('logged', msg);
        });

        var timestamp = new Date();
        meta.level = level;

        if (this.logstash) {
            meta = {
                '@message': msg,
                '@timestamp': timestamp,
                '@fields': meta
            };
        } else {
            meta.timestamp = timestamp;
            meta.message = msg;
        }

        this.db.insert({
            resource: 'log',
            logstash: this.logstash,
            params: meta
        }, function (err, data) {
            callback();
        });

    }
};