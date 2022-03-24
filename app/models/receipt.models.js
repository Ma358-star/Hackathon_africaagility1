const mongoose = require("mongoose");

const Receipt = mongoose.model(
    'Receipt', 
    new mongoose.Schema({
        quantity: {
            type: Number,
            required: true
             },
        description: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }, {timestamps: true})
);
module.exports = Receipt;