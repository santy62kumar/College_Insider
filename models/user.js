const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unquie: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    },
    avatar: {
        type: String,
    },
    otp: {
        type: Number,
    },
    otpValid: {
        type: Date,
    },
    emailValidate: {
        type: String,
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('user', userSchema);

module.exports = User;