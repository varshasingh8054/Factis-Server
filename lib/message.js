let SUCCESS_MESSAGE =  Object.freeze({
    STATUS:1,
    SUCCESS:"Success.",
    SIGNUP_SUCCESS:"Registration Success.",
    LOGIN_SUCCESS:"Login Success."
});

let ERROR_MESSAGE =  Object.freeze({
    STATUS:0,
    ERROR:"Error.",
    INVALID_EMAIL:"Email is not registered with us.",
    EMAIL_EXIST:"Account already exist with this email.",
    INVALID_OLD_PWD:"You have entered wrong old password.",
    INVALID_AUTH:"You are not authorized.Please login again.",
    INVALID_PWD:"Wrong Password.",
    INVALID_OTP:"You have entered wrong or expired OTP.",
    RESET_PWD_LINK_EXPIRE:"Your reset password link has been expired."
});

module.exports = {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE
}