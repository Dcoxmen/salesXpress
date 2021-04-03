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
      district,
      districtmgr,
      region,
      regionmgr,
      contact,
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

 profileFields.local = {};

 if(district) profileFields.local.district = district;
 if(districtmgr) profileFields.local.districtmgr = districtmgr;
 if(region) profileFields.local.region = region;
 if(regionmgr) profileFields.local.regionmgr = regionmgr;
 if(contact) profileFields.local.contact = contact;

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


// @route    PUT api/profile/complan
// @desc     Add profile compensation plan
// @access   Private

router.put('/complan', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('reportsto', 'Reports to manager is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });

  }

  const {
    title,
    type,
    reportsto,
    basesalary,
    salesincentive,
    ontargetearn,
    revenue,
    avgcontract,
    compensationvar,
    lifecycle,
    tierlevel
  } = req.body;

  const newComp = {
    title,
    type,
    reportsto,
    basesalary,
    salesincentive,
    ontargetearn,
    revenue,
    avgcontract,
    compensationvar,
    lifecycle,
    tierlevel
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.complan.unshift(newComp);
    await profile.save()
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

// @route    DELETE api/profile/complan/:comp_id
// @desc     Delete profile compensation plan
// @access   Private

router.delete('/complan/:comp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.complan
    .map(item => item.id)
    .indexOf(req.params.comp_id);

    profile.complan.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//================

// @route    PUT api/profile/metrics
// @desc     Add profile metric numbers
// @access   Private

router.put('/metrics', [auth, [
  check('model', 'Model name is required').not().isEmpty(),
  check('revenue', 'Revenue amount is required').not().isEmpty(),
  check('margin', 'Margin amount is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });

  }

  const {
    model,
    revenue,
    margin,
    cost,
    average,
    from,
    to
  } = req.body;

  const newMetric = {
    model,
    revenue,
    margin,
    cost,
    average,
    from,
    to
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.metrics.unshift(newMetric);
    await profile.save()
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

// @route    DELETE api/profile/metrics/:metric_id
// @desc     Delete profile metrics plan
// @access   Private

router.delete('/metrics/:metric_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.metrics
    .map(item => item.id)
    .indexOf(req.params.metric_id);

    profile.metrics.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})



module.exports = router;