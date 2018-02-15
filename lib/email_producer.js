var Config = require('../config/config'),
    conf = new Config();
var routingKey = conf.rb_key_email; //'email';

module.exports.sendEmail = function(data) {
    // var notifyString = JSON.stringify(data);
    // console.log('Notify_Producer sending notify ' + notifyString);
    var sendMsg = require('./rbProducer.js').sendMsg;
    sendMsg(routingKey, data);
};