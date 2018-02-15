'use strict';
var Config = require('../config/config'),
    conf = new Config();
var Q = require('q');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: conf.email_host, // 'smtp.gmail.com',
    port: conf.email_port, // 465,
    secure: true, // secure:true use TLS for port 465, secure:false for port 587
    auth: {
        user: conf.email_auth_user, // 'user1@gmail.com',
        pass: conf.email_auth_pass, // 'xxxxxxxxxxxxxxxxxxxxxx'
    }
});

module.exports.sendEmail = function(mailOptions) {
    var deferred = Q.defer();
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }
        if (info && info.messageId) {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
        deferred.resolve(info);
    });
    return deferred.promise;
}

module.exports.close = function() {
    transporter.close();
    console.log('Nodemailer transporter close...');
}