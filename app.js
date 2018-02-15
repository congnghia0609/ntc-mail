// @ts-nocheck
var Config = require('./config/config'),
    conf = new Config();
var email_consumer = require('./lib/email_consumer');
var argv = require('minimist')(process.argv.slice(2));
var fileUtil = require('./lib/file_util');

console.log('==================================== ntc-mail');
console.log('Server read config environment: ' + process.env.NODE_ENV);
console.log('Using arguments ' + JSON.stringify(argv));
console.log('Worker Email Consumer is running...');
console.log('====================================');
// Init CACHE Email Template.
fileUtil.init();

// Start Email Consumer Woker.
emailConsumer = email_consumer();

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function() {
    console.log('Shutting down');
    emailConsumer.close();
    process.exit();
});