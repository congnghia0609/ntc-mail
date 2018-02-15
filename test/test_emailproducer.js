var emailProducer = require('../lib/email_producer');

// Constant Email.
const MAIL_TOPIC = 'email';
const MAIL_JOB = 'MAIL_Job';
const MAIL_USER = 'MAIL_User';

var data = {
    topic: MAIL_TOPIC,
    type: MAIL_JOB,
    email: {
        from: '"ntc" <user1@gmail.com>', // sender address
        to: 'nghia@inspilab.com', // list of receivers
        // cc: 'congnghia0609@gmail.com',
        subject: '[ntc] Hello', // Subject line
        // text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>', // html body
        attachments: [{ // use URL as an attachment
            filename: "googlelogo_color_272x92dp.png",
            path: "https://www.google.com.vn/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }]
    }
}

emailProducer.sendEmail(data);

console.log('==================================== emailProducer.sendEmail');
console.log(JSON.stringify(data));
console.log('====================================');