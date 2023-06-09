const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter a name"],
    },

    avatar: {
        public_id: String,
        url: String,
    },

    email: {
        type: String,
        required: [true, "Please enter an Email"],
        unique: [true, "Email already exists"],
    },

    password: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },

    confirmpassword: {
        type: String,
        required: [true, "Please enter a Password again"],
        minlength: [6, "Password must be at least 6 characters"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password confirmation does not match",
        },
        select: false,
    },
});

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = this.password;
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET);
}

module.exports = mongoose.model("User", userSchema);