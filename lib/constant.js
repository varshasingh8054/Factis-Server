const fs = require('fs');
const path = require('path');

module.exports = Object.freeze({
    USER_TYPE: {
        ADMIN:0,
        CUSTOMER:1,
        VENDOR:2
    },
    OTP_PREFERENCES:{
        LENGTH:4,
        EXPIRE_IN_SECONDS:300,
        ENCODING:'base32'
    },
    EMAIL:{
        FORGOT_PWD:{
            TYPE:0,
            SUBJECT:"Forgot Password",
            TEMPLATE:fs.readFileSync(path.resolve(__dirname,'../email-templates/forgot-password.html'))
        }
    }
});