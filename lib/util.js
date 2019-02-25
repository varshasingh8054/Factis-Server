const speakeasy = require("speakeasy");
const CONSTANTS = require('./constant');
class utilClass{
    constructor(){}

    getOTP(){
        const secret = speakeasy.generateSecret({length: 20});
        const token = speakeasy.totp({
            secret: secret.base32,
            encoding: CONSTANTS.OTP_PREFERENCES.ENCODING,
            digits:CONSTANTS.OTP_PREFERENCES.LENGTH,
            time: CONSTANTS.OTP_PREFERENCES.EXPIRE_IN_SECONDS
        });
        
        return {
            token,
            two_factor_temp_secret:secret.base32
        };
    }

    verifyOTP(token,secret){
        const tokenValidates = speakeasy.totp.verify({
            secret: secret,
            encoding: CONSTANTS.OTP_PREFERENCES.ENCODING,
            digits:CONSTANTS.OTP_PREFERENCES.LENGTH,
            token: token,
            time: CONSTANTS.OTP_PREFERENCES.EXPIRE_IN_SECONDS
        });
        return tokenValidates;
    }
}

module.exports = new utilClass();