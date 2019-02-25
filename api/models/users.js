const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: {
        token: { type: String, default: null },
        two_factor_temp_secret: { type: String, default: null }
    },
    userType: { type: Number, default: null },
    resetPassword: {
        token: { type: String, default: null },
        expires: { type: Number ,default:0 }
    },
    isUserUpdatedOnce: { type: Boolean, default: false }
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

// UserSchema.pre("update", function(next) {
//     const password = this.getUpdate().$set.password;
//     if (!password) {
//         return next();
//     }
//     try {
//         const salt = bcrypt.genSaltSync();
//         const hash = bcrypt.hashSync(password, salt);
//         this.getUpdate().$set.password = hash;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

UserSchema.set('toObject')

module.exports = mongoose.model('users', UserSchema);