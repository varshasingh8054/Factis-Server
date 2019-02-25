const express = require('express');
const controller = require('./controller');
const validation = require('./validation');
const auth = require('../middleware');

module.exports = express
  .Router()
  .post('/login',validation.login, controller.login)
  .post('/forgotPassword',validation.forgotPassword,controller.forgotPassword)
  .post('/resetPassword',validation.resetPassword,controller.resetPassword)
