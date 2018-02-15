//@ts-nocheck
var Config = require('../config/config'),
    conf = new Config();
var all = require('bluebird').all;
var amqp = require('amqplib');
var amqpUrl = conf.amqp_url; //'amqp://username:password@localhost:5672/';
var emailUtil = require('./email_util');
var fileUtil = require('./file_util');

exports.startConsumer = function(key) {
    // Constant.
    var routingKey = key;
    var ex = routingKey;
    var qname = routingKey;
    var arrkey = [];
    arrkey.push(routingKey);

    var open = amqp.connect(amqpUrl);
    open.then(function(conn) {
        // @ts-ignore
        process.once('SIGINT', function() {
            conn.close();
            emailUtil.close();
        });

        return conn.createChannel().then(function(ch) {
            var ok = ch.assertExchange(ex, 'topic', { durable: true });

            ok = ok.then(function() {
                return ch.assertQueue(qname, { exclusive: false });
            });

            ok = ok.then(function(qok) {
                var queue = qok.queue;
                return all(arrkey.map(function(rk) {
                    ch.bindQueue(queue, ex, rk);
                })).then(function() {
                    return queue;
                });
            });

            ok = ok.then(function(queue) {
                return ch.consume(queue, processMessage, { noAck: true });
            });

            return ok.then(function() {
                // console.log('====================================');
                // console.log(' [*] Waiting for logs. To exit press CTRL+C...');
                // console.log('====================================');
            });

            function processMessage(msg) {
                // console.log(' [x] consumer recv | %s: %s', msg.fields.routingKey, msg.content.toString());
                var data = JSON.parse(msg.content);
                if (data && data.email) {
                    var topic = data.topic;
                    var type = data.type;
                    var email = data.email;
                    // Add email cc config.
                    if (email.cc) {
                        if (conf.email_cc) {
                            email.cc = conf.email_cc + ", " + email.cc
                        }
                    } else {
                        if (conf.email_cc) {
                            email.cc = conf.email_cc
                        }
                    }
                    // Add email bcc config.
                    if (email.bcc) {
                        if (conf.email_bcc) {
                            email.bcc = conf.email_bcc + ", " + email.bcc
                        }
                    } else {
                        if (conf.email_bcc) {
                            email.bcc = conf.email_bcc
                        }
                    }

                    // 1. Create email content forget password.
                    if (type == conf.type_email_forget_password) {
                        var data_data = data.data;
                        var html = fileUtil.getContentEmailSync('email_forget_password.html');
                        if (html && html.length > 0) {
                            html = html.replace(new RegExp('{USERNAME}', 'g'), data_data.name);
                            // html = html.replace(new RegExp('{TYPE_USER}', 'g'), data_data.type_user);
                            html = html.replace(new RegExp('{EMAIL}', 'g'), data_data.email);
                            html = html.replace(new RegExp('{PASSWORD}', 'g'), data_data.password);
                            email.html = html;
                        }
                    } else if (type == conf.type_email_verify_account) {
                        // 2. Create email content verify account.
                        var data_data = data.data;
                        var html = fileUtil.getContentEmailSync('email_verify_user.html');
                        if (html && html.length > 0) {
                            html = html.replace(new RegExp('{USERNAME}', 'g'), data_data.name);
                            html = html.replace(new RegExp('{URL_VERIFY}', 'g'), data_data.url_active);
                            email.html = html;
                        }
                    } else if (type == conf.type_email_payment) {
                        // 3. Create email content payment.
                        var data_data = data.data;
                        var html = fileUtil.getContentEmailSync('email_payment.html');
                        if (html && html.length > 0) {
                            html = html.replace(new RegExp('{USERNAME}', 'g'), data_data.name);
                            html = html.replace(new RegExp('{FROM_USER}', 'g'), data_data.from_user);
                            html = html.replace(new RegExp('{TO_USER}', 'g'), data_data.to_user);
                            html = html.replace(new RegExp('{AMOUNT}', 'g'), data_data.amount);
                            html = html.replace(new RegExp('{DESC}', 'g'), data_data.desc);
                            email.html = html;
                        }
                    } else if (type == conf.type_email_timesheet) {
                        // 4. Create email content timesheet.
                        var data_data = data.data;
                        var html = fileUtil.getContentEmailSync('email_timesheet.html');
                        if (html && html.length > 0) {
                            html = html.replace(new RegExp('{USERNAME}', 'g'), data_data.name);
                            html = html.replace(new RegExp('{ASSIGNMENT_NAME}', 'g'), data_data.assignment_name);
                            html = html.replace(new RegExp('{AMOUNT}', 'g'), data_data.amount);
                            html = html.replace(new RegExp('{DESC}', 'g'), data_data.desc);
                            email.html = html;
                        }
                    } else if (type == conf.type_email_assignment) {
                        // 5. Create email content assignment.
                        var data_data = data.data;
                        var html = fileUtil.getContentEmailSync('email_assignment.html');
                        if (html && html.length > 0) {
                            html = html.replace(new RegExp('{USERNAME}', 'g'), data_data.name);
                            html = html.replace(new RegExp('{ASSIGNMENT_ID}', 'g'), data_data.assignment_id);
                            html = html.replace(new RegExp('{ASSIGNMENT_NAME}', 'g'), data_data.assignment_name);
                            html = html.replace(new RegExp('{JOB_NAME}', 'g'), data_data.job_name);
                            html = html.replace(new RegExp('{ASSIGNMENT_START_DAY}', 'g'), data_data.assignment_start_day);
                            html = html.replace(new RegExp('{ASSIGNMENT_END_DAY}', 'g'), data_data.assignment_end_day);
                            html = html.replace(new RegExp('{ASSIGNMENT_WEEK_HOUR_MAX}', 'g'), data_data.assignment_week_hour_max);
                            html = html.replace(new RegExp('{ASSIGNMENT_HOUR_SALARY}', 'g'), data_data.assignment_hour_salary);
                            html = html.replace(new RegExp('{ASSIGNMENT_TOTAL_SALARY}', 'g'), data_data.assignment_total_salary);
                            // html = html.replace(new RegExp('{DESC}', 'g'), data_data.desc);
                            email.html = html;
                        }
                    }

                    // send email.
                    data.email = email;
                    emailUtil.sendEmail(email).then(function(res) {
                        console.log('==================================== processMessage sendEmail');
                        console.log(res);
                        console.log('====================================');
                    });
                }
            }
        });
    }).catch(console.warn);
}