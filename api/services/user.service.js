const Models = require('../models');

class UserService {

    async saveUser(user) {
        return await user.save();
    }

    async createUser(document) {
        console.log("In create user");
        return await Models.users.create(document);
    }

    findUser(query, projections) {
        console.log(Models.users.findOne(query, projections).exec());
        return Models.users.findOne(query, projections).exec();
        
    }

    updateUser(query, updateObj, options) {
        console.log("In user updateUser"); 
        return Models.users.update(query, updateObj, options).exec();
    }
}

module.exports = new UserService();
