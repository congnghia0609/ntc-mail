process.env['NODE_ENV'] = process.env.NODE_ENV || 'local';

module.exports = function() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };

        case 'testing':
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };

        case 'staging':
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };

        case 'production':
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };

        case 'local':
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };

        default: // Local
            return {
                "amqp_url": "amqp://username:password@localhost:5672/",
                "JWT_SECRET_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "rb_key_email": "email",
                "email_host": "smtp.gmail.com",
                "email_port": 465,
                "email_auth_user": "user@gmail.com",
                "email_auth_pass": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "email_cc": "",
                "email_bcc": "",
                "email_dir_templates": "/path/to/folder/ntc-mail/templates/",
                "type_email_forget_password": "MAIL_User_Forget_Password",
                "type_email_verify_account": "MAIL_User_Verify_Account",
                "type_email_payment": "MAIL_User_Payment",
                "type_email_timesheet": "MAIL_User_Timesheet",
                "type_email_assignment": "MAIL_User_Assignment",
            };
    }
};