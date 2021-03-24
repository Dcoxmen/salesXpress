const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  GET api/profile/me
//@desc   Current user profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'image']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route  POST api/profile
//@desc   Create or Update User Profile
//@access Private

router.post('/',
[auth, 
    [
    check('franchise', 'franchise is required').not().isEmpty(),
    check('admin', 'Admin is required').not().isEmpty()
] ],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
  }
  const {
      
      franchise,
      jobtitle,
      location,
      salesgoal,
      myaccounts

  } = req.body;

  // Profile object
  const profileFields = {};
 profileFields.user = req.user.id;
 if(franchise) profileFields.franchise = franchise;
 if(jobtitle) profileFields.jobtitle = jobtitle;
 if(location) profileFields.location = location;
 if(salesgoal) profileFields.salesgoal = salesgoal;
 if(myaccounts) {
     profileFields.myaccounts = myaccounts.split(',').map(myaccounts => myaccounts.trim());
 }
  console.log(profileFields.franchise);
  res.send('Hello profile')
})

module.exports = router;