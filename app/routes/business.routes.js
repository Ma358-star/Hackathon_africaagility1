const router = require('express').Router();
const Business = require('../models/business.models.js');

//Create a business account
router.post('/business', async (req, res) => {
    const {userId,businessName,businessModel,previousApp} =req.body;
    try {
        if(!(userId && businessName && businessModel && previousApp)){
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        }
        const newPost = new Business(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});
                      

module.exports = router;



