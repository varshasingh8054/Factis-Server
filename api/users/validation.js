const Joi = require('joi');

class UserValidations{
    constructor(){}

    create(req,res,next){
        console.log("In create validation ");
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName:Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                console.log("Error fill all field");
                next(err);
            }else{
                next();
            }
         });        
    }

    login(req,res,next){
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                console.log("Error fill all field");
                next(err);
            }else{
                next();
            }
        });        
    }

    resetPassword(req,res,next){
        const schema = Joi.object().keys({
            email:Joi.string().email().required(),
            verificationCode: Joi.object().keys({
                token:Joi.string().required(),
             two_factor_temp_secret:Joi.string().required()
            }),
            password: Joi.string().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                next(err);
            }else{
                next();
            }
        });        
    }

    changePassword(req,res,next){
        const schema = Joi.object().keys({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                next(err);
            }else{
                console.log("In change password ");
                next();

            }
        });        
    }

    forgotPassword(req,res,next){
        const schema = Joi.object().keys({
            email: Joi.string().email().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                next(err);
            }else{
                
                next();
            }
        });        
    }
}

module.exports = new UserValidations();