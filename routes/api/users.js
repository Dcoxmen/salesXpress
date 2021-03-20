const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');



//@route  POST api/users
//@desc   Register User
//@access Public
router.post('/', [ body('name', 'Name is required').not().isEmpty(),
body('email', 'Please enter a valid email').isEmail(),
body('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
], 

async (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { name, email, image, password } = req.body;

    try {
    let user = await User.findOne({ email });

    if(user) {
    res.status(400).json({ errors: [{ msg: 'User already exists'}]});
    }

    user = new User({
        name,
        email,
        image,
        password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send('User Registered')

    }catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
    }





});

module.exports = router;