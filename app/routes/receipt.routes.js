const router = require('express').Router();
const Receipt = require('../models/receipt.models');

//Create a receipt
router.post('/receipt', async (req, res) => {
    const {quantity,description,unitPrice,amount} =req.body;
    try {
        if(!(quantity && description && unitPrice && amount)){
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        }
        const newPost = new Receipt(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        //res.status(500).json(error);
        console.log(error)
    }
});

module.exports = router;