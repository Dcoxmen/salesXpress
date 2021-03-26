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
        res.json(profile)

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
      myaccounts,
      youtube,
      instagram,
      linkedin,
      facebook,
      twitter,
      admin

  } = req.body;

  // Profile object
  const profileFields = {};
 profileFields.user = req.user.id;
 if(admin) profileFields.admin = admin;
 if(franchise) profileFields.franchise = franchise;
 if(jobtitle) profileFields.jobtitle = jobtitle;
 if(location) profileFields.location = location;
 if(salesgoal) profileFields.salesgoal = salesgoal;
 if(myaccounts) {
     profileFields.myaccounts = myaccounts.split(',').map(myaccounts => myaccounts.trim());
 }

 profileFields.social = {};

 if(youtube) profileFields.social.youtube = youtube;
 if(twitter) profileFields.social.twiter = twitter;
 if(facebook) profileFields.social.facebook = facebook;
 if(linkedin) profileFields.social.linkedin = linkedin;
 if(instagram) profileFields.social.instagram = instagram;

try{
    let profile = await Profile.findOne({ user: req.user.id });
    if(profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set:profileFields }, { new: true });

        return res.json(profile);
    }

    //Create profile
    profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile)


}catch(err) {
console.error(err.message);
res.status(500).send('Server Error')
}
 
})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'image']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route    GET api/profile/user/:user_id
// @desc     Get a profile by user id
// @access   Private
router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'image']);

      if(!profile) return res.status(400).json({ msg: 'Profile Not Found'})
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if(err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile Not Found'})
      }
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/profile
// @desc     Delete profile, user, and post
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;