const { userServices } = require('../api/services');

class CommonFunctions {

  async validateEmail(payload) {
    console.log(payload.email);
    try {
      let query = {};
      if (payload.email) {
        query = {
          email: payload.email
        }
        console.log("In validate email");
      } else if (payload.token) {
        query = {
          "resetPassword.token" :payload.token
        }
      }
      let users = await userServices.findUser(query);
      return users;
    } catch (err) {
      throw new Error(err);
    }

  }
}

module.exports = new CommonFunctions();