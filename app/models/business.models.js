const mongoose = require("mongoose");

const Business = mongoose.model(
    'Business', 
    new mongoose.Schema({
        userId : {
        type: String, 
        required: true
       },
        businessName: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },

        businessModel: {
            type: String,
            required: true,
            min: 8
        },

        previousApp: {
            type: String,
            required: true,
            min: 8
        },
    }, {timestamps: true})
)
module.exports = Business;