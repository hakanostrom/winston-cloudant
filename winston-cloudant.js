const Transport = require('winston-transport');
const Cloudant = require('@cloudant/cloudant');
//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class CloudantTransport extends Transport {

    constructor(opts) {
        super(opts);

        if (!opts.url && !(opts.username && opts.password && opts.host))
            return console.log('Insufficient database credentials provided');

        this.goOn = false;

        // Instantiate using url OR username/password/host
        this.cloudant = Cloudant({
            url: opts.url || 'https://' + opts.username + ':' + opts.password + '@' + opts.host,
            plugins: { iamauth: { iamApiKey: opts.iamApiKey || '' } }
        });

        // Default database name if none provided
        this.dbName = opts.db || 'winston-cloudant';

        // Create database to be sure it exists
        // this.cloudant.db.create(opts.db)
        // .then(err => console.log('db skapades'))
        // .catch(err => console.log('db finns redan'));

        this.db = this.cloudant.use(opts.db);

        // Formatting for Logstash
        this.logstash = true;
        if (opts.logstash == false || opts.logstash == 'false')
            this.logstash = false;
            
    }

    async log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        if (!this.goOn) {
            await this.cloudant.db.create(this.dbName).catch(err => { });
            this.goOn = true;
        }

        var meta = {};

        info.timestamp = new Date();

        if (this.logstash) {
            meta = {
                '@message': info.message,
                '@timestamp': info.timestamp,
                '@fields': info
            };

            delete meta['@fields'].message;
            delete meta['@fields'].timestamp;
        }
        else {
            meta = info;
        }

        this.db.insert({
            resource: 'log',
            logstash: this.logstash,
            time: info.timestamp,
            params: meta
        }, function (err, data) {

            if (err)
                console.log("FEL: " + err + "");

            callback();
        });
    }
};