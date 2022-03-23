const mongoose = require("mongoose");

const User = mongoose.model(
    'User', 
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 8
        },

        confirm_pass: {
            type: String,
            required: true,
            min: 8
        },
    }, {timestamps: true})
)
module.exports = User;