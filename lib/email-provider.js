const emailConfig = require('../config/default');
const { EMAIL } = require('./constant');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const CONSTANT = require('../lib/constant');

class EmailProvider {
  constructor() {
    this.credential = emailConfig.SMTP;
    this.transporter = nodemailer.createTransport(this.credential);
  }

  async transportEmail(mailOptions) {
    return await this.transporter.sendMail(mailOptions);
  }

  sendEmail(userType, type, data) {
    let mailOptions = {};
    switch (type) {
      case EMAIL.FORGOT_PWD.TYPE:
        let subject = EMAIL.FORGOT_PWD.SUBJECT;
        let template = handlebars.compile((EMAIL.FORGOT_PWD.TEMPLATE).toString());
        let templateData = {};
        let dataCopy = Object.assign({}, data);
        if(userType === CONSTANT.USER_TYPE.CUSTOMER){
          templateData = {
            user:true,
            email:dataCopy.email,
            otp:dataCopy.otp
          }
        }else if(userType === CONSTANT.USER_TYPE.ADMIN){
          templateData = {
            admin:true,
            url:dataCopy.url
          }
        }       
        let html = template(templateData);
        mailOptions = {
          to: dataCopy.email,
          subject: subject,
          html
        };
        break;
      default: break;

        return this.forgotPassword(mailOptions);
    }
  }

  forgotPassword(mailOptions) {
    mailOptions.from = 'madhurendra.singh@mobilyte.com';
    return this.transportEmail(mailOptions);
  }


}

module.exports = new EmailProvider();