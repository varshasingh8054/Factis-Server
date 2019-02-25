const { userServices } = require('../services/index');
const jwtToken = require('../../lib/auth');
const { EMAIL, USER_TYPE } = require('../../lib/constant');
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../lib/message');
const commonFunctions = require('../../lib/common');
const emailProvider = require('../../lib/email-provider');
const logger = require('../../lib/logger');
const mongoose = require('mongoose').Types;
const customError = require('../../lib/custom-error');
const util = require('../../lib/util')


class Controller {

  async login(req, res, next) {
    try {
      let payload = req.body;
      let user = await commonFunctions.validateEmail(payload);
      if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
          if (!isMatch) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_PWD });
          let { firstName, lastName, email, _id } = user;
          let token = jwtToken.createJWToken({
            sessionData: { firstName, lastName, email, _id },
            maxAge: 3600
          });
          logger.logResponse(req.id, res.statusCode, 200);
          res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS, token: token })
        });
      } else {
        next(new customError(ERROR_MESSAGE.INVALID_EMAIL));
      }
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
    }
  }

  async forgotPassword(req, res) {
    try {
      let payload = req.body;
      let user = await commonFunctions.validateEmail(payload);
      if (user) {
        let timestamp = new Date().getTime() + (30*60000);
        let token = `${user._id}${timestamp}`;
        let url = `http://localhost:3000/reset_password?token=${token}`;
        let query = {
          _id:user._id
        };
        let updateObj = {
          resetPassword: {
            token,
            expires: timestamp
          }
        }
        let updatedUser = await userServices.updateUser(query, updateObj, { new: true });
        user.url = url;
        let emailReply = await emailProvider.sendEmail(USER_TYPE.ADMIN, EMAIL.FORGOT_PWD.TYPE, user);
        res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS, data: url })
      } else {
        res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_EMAIL });
      }
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
    }
  }

  async resetPassword(req, res, next) {
    try {
      let payload = req.body;
      let user = await commonFunctions.validateEmail(payload);
      if (user) {
        let currentTimestamp = new Date().getTime();
        let tokenTimestamp = user.resetPassword && user.resetPassword.expires;
        if(currentTimestamp > tokenTimestamp){
          return next(new customError(ERROR_MESSAGE.RESET_PWD_LINK_EXPIRE));
        }
        user.password = payload.password;
        await userServices.saveUser(user);
        res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS })
      } else {
        res.send({ status: 0, code: 404, message: ERROR_MESSAGE.RESET_PWD_LINK_EXPIRE });
      }
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
    }
  }

}
module.exports = new Controller();