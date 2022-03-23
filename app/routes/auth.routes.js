const User = require('../models/user.model');
const routes = require('express').Router();
//const jwt = require('jwt');
const bcrypt = require('bcryptjs');

//Register
routes.post('/register', async (req, res) => {
    const {name, email, password, confirm_pass} = req.body;

    try {
            if(!(name && email && password && confirm_pass)){
                res.status(403).json({
                    message: 'Content cannot be empty!'
                })
            } else {
                const user = await User.findOne({email: email});
                console.log('Found user: ', user);
        
                if(!user) {
                    await bcrypt.hash(password, 10).then(hashedPassword => {
                        //Create new User
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                            confirm_pass: hashedPassword
                        });
                        console.log(newUser);
        
                        //Save new user and send response
                        const user = newUser.save();
                        res.status(200).json({message: 'User registered successfully', user: newUser});
                    })
                } else {
                    res.status(403).json({
                        message: 'Failed! User already exists'
                    });
                }
                
            }
        } catch (err) {
            res.status(500).json(error)
            console.log(error)
        }
});

//Login
routes.post('/login', async (req, res) =>{
    const {email, password} = req.body;

    try {
        if (!(email, password)) {
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const user = await User.findOne({email: email})
            !user && res.status(404).json("User not found");

            const validPassword = await bcrypt.compare(password, user.password);
            !validPassword && res.status(400).json({message: 'Invalid credientials'})

            //Create token
            var token = jwt.sign({user_id: user._id, user_email: user.email}, `${process.env.TOKEN_KEY}`, {expiresIn: 86400});
            console.log('token: ', token);  

            res.status(200).json({message: 'User logged in successfully', user: user, token})
        }

    } catch (err) {
        res.status(500).json(error)
    console.log(error)
    }
});
