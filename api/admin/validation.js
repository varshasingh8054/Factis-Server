const Joi = require('joi');

class AdminValidations{
    constructor(){}

    login(req,res,next){
        const schema = Joi.object().keys({
            password: Joi.string().required(),
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

    resetPassword(req,res,next){
        const schema = Joi.object().keys({
            token:Joi.string().required(),
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

module.exports = new AdminValidations();