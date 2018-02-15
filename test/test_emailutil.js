var emailUtil = require('../lib/email_util');

// setup email data with unicode symbols
let mailOptions = {
    from: '"ntc" <user1@gmail.com>', // sender address
    to: 'nghia@inspilab.com', // list of receivers
    // cc: 'congnghia0609@gmail.com',
    subject: '[ntc] Hello', // Subject line
    // text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>', // html body
    attachments: [{ // file on disk as an attachment 
        filename: "googlelogo_color_272x92dp.png",
        path: "https://www.google.com.vn/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    }]
};

emailUtil.sendEmail(mailOptions).then(function(res) {
    console.log('==================================== sendEmail');
    console.log(res);
    console.log('====================================');
});