var path = require('path');
var fileUtil = require('../lib/file_util');


// 1.1. Test getContentFile
fileUtil.getContentFile('email_1.html').then(function(res) {
    console.log('==================================== getContentFile');
    console.log(res);
    console.log('====================================');
});

// 1.3. Init
fileUtil.init();

// 1.4. Test getCacheEmail
fileUtil.getCacheEmail('email.html').then(function(res) {
    console.log('==================================== Test getCacheEmail');
    console.log(res);
    console.log('====================================');
});

// 1.5. Test getCacheEmailSync
var ct = fileUtil.getCacheEmailSync('email_1.html');
console.log('==================================== Test getCacheEmailSync');
console.log(ct);
console.log('====================================');

// 1.5. Test getContentEmail
fileUtil.getContentEmail('email.html').then(function(res) {
    console.log('==================================== Test getContentEmail');
    console.log(res);
    console.log('====================================');
});