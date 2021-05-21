# ntc-mail With NodeJS, Redis, RabbitMQ

A **ntc-mail** service that uses **NodeJs** as worker (Rabbit Consumer), **Redis** as a storage, **RabbitMQ** as message queue, to send email.  
  
  
# A. Setup

Install NodeJs from [http://nodejs.org/](http://nodejs.org/)  
Install Redis from [https://redis.io/](https://redis.io/)  
Install RabbitMQ from [https://www.rabbitmq.com/](https://www.rabbitmq.com/)  
  

## Setup nodejs && npm && nvm

```shell
# nodejs
sudo apt-get update
## nodejs default
sudo apt-get install nodejs

## nodejs 7.x
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

## nodejs 8.x
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs build-essential

## check
node -v


# npm
sudo apt-get install npm

npm --version


# nvm
cd ~
sudo apt-get install build-essential libssl-dev
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile

## check
nvm ls-remote
nvm help

nvm install 7.10.1
nvm alias default 7.10.1
nvm use 7.10.1

or

nvm install 8.9.4
nvm alias default 8.9.4
nvm use 8.9.4
```

## Setup PM2

```
sudo npm install pm2 -g
```
  
  
# B. Redis  

## Start Redis  

```
cd redis-3.2.9
src/redis-server redis.conf
or
nohup src/redis-server redis.conf >/dev/null 2>&1 &
```
  
  
# C. ntc-Mail
  
## Config file
  
View and modify file configuration in folder **./config/config.js**  
  

## Start ntc-mail  
  
```shell
cd ntc-chat
npm install
## NODE_ENV: development || testing || staging || production || local
export NODE_ENV=development
node app.js
```

or start node project by PM2.  

```shell
# list project nodejs.
pm2 list

# Start app.
## NODE_ENV: development || testing || staging || production || local
export NODE_ENV=development
pm2 start app.js --name ntc-mail


# view logs
pm2 logs

# restart
pm2 restart <pid>

# stop
pm2 stop <pid>

# remove app.
pm2 delete <pid>
```
  
  
# D. ntc-Email Gmail Account.
```
https://myaccount.google.com/apppasswords

### Account Gmail.
us: user@gmail.com
pw: password

### App smtp gmail.
pw: xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
  
  
# E. ntc-Mail document API
  
## 1.1. Convention.

```js
// Constant Email.
const MAIL_TOPIC = 'email';
const MAIL_JOB = 'MAIL_Job';
const MAIL_USER = 'MAIL_User';
```
  

## 1.2. Send Email.

```js
var data = {
    topic: MAIL_TOPIC,
    type: MAIL_JOB,
    email: {
        from: '"ntc" <user1@gmail.com>', // sender address
        to: 'nghia1@gmail.com, nghia2@gmail.com', // list of receivers
        cc: 'nghia3@gmail.com, nghia4@gmail.com',
        bcc: 'nghia5@gmail.com, nghia6@gmail.com',
        subject: '[ntc] Hello', // Subject line
        html: '<b>Hello world ?</b>', // html body
        attachments: [
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            },
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                content: 'hello world!'
            },
            {   // binary buffer as an attachment
                filename: 'text2.txt',
                content: new Buffer('hello world!','utf-8')
            },
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: '/path/to/file.txt' // stream this file
            },
            {   // filename and content type is derived from path
                path: '/path/to/file.txt'
            },
            {   // stream as an attachment
                filename: 'text4.txt',
                content: fs.createReadStream('file.txt')
            },
            {   // define custom content type for the attachment
                filename: 'text.bin',
                content: 'hello world!',
                contentType: 'text/plain'
            },
            {   // encoded string as an attachment
                filename: 'text1.txt',
                content: 'aGVsbG8gd29ybGQh',
                encoding: 'base64'
            },
            {   // data uri as an attachment
                path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
            },
            {
                // use pregenerated MIME node
                raw: 'Content-Type: text/plain\r\n' +
                    'Content-Disposition: attachment;\r\n' +
                    '\r\n' +
                    'Hello world!'
            }
        ]
    }
};
var email_producer = require('./lib/email_producer');
email_producer.sendEmail(data);
```


## 1.3. process Message Email.
  
Code process message email in **function processMessage** in file **rbEmailConsumer.js**  

```js
...
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
...
```
