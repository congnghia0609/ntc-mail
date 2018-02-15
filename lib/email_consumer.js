var Config = require('../config/config'),
    conf = new Config();
var routingKey = conf.rb_key_email; //'email';

module.exports = function() {
    var startConsumer = require('./rbEmailConsumer.js').startConsumer;
    startConsumer(routingKey);

    return {
        close: function() {
            console.log('Shutting down Email_Consumer...');
        }
    };
};