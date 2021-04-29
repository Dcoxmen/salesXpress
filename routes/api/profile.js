const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

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
    body('franchise', 'franchise is required').not().isEmpty(),
    body('admin', 'Admin is required').not().isEmpty()
] ],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
  }
  const {
      
      franchise,
      market,
      location,
      ranking,
      admin,
      contact,
      district,
      region

  } = req.body;

  // Profile object
  const profileFields = {};
 profileFields.user = req.user.id;
 if(franchise) profileFields.franchise = franchise;
 if(market) profileFields.market = market;
 if(location) profileFields.location = location;
 if(ranking) profileFields.ranking = ranking;
 if(admin) profileFields.admin = admin;
 if(contact) profileFields.contact = contact;
 if(district) profileFields.district = district;
 if(region) profileFields.region = region;


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


// @route    PUT api/profile/curweeklob
// @desc     Add profile compensation plan
// @access   Private

router.put('/curweeklob', [auth], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });

  }

  const {
    upsrev,
    upsmgndol,
    upsmgnpct,
    dhlrev,
    dhlmgndol,
    dhlmgnpct,
    ltlrev,
    ltlmgndol,
    ltlmgnpct,
    totalrev,
    totalmgndol,
    totalmgnpct,
    from,
    to
  } = req.body;

  const newCurlob = {
    upsrev,
    upsmgndol,
    upsmgnpct,
    dhlrev,
    dhlmgndol,
    dhlmgnpct,
    ltlrev,
    ltlmgndol,
    ltlmgnpct,
    totalrev,
    totalmgndol,
    totalmgnpct,
    from,
    to
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.curweeklob.unshift(newCurlob);
    await profile.save()
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

// @route    DELETE api/profile/curweeklob/:lob_id
// @desc     Delete profile compensation plan
// @access   Private

router.delete('/curweeklob/:lob_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.curweeklob
    .map(item => item.id)
    .indexOf(req.params.lob_id);

    profile.curweeklob.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//================

// @route    PUT api/profile/ytdlobmgn
// @desc     Add profile metric numbers
// @access   Private

router.put('/ytdlobmgn', [auth], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });

  }

  const {
    year,
    upsytdrev,
    upsytdmgndol,
    upsytdmgnpct,
    dhlytdrev,
    dhlytdmgndol,
    dhlytdmgnpct,
    ltlytdrev,
    ltlytdmgndol,
    ltlytdmgnpct,
    totalytdrev,
    totalytdmgndol,
    totalytdmgnpct
  } = req.body;

  // const newLob = {};
  // if(year) newLob.year = year;
  // if(upsytdrev) newLob.upsytdrev = upsytdrev;
  // if(upsytdmgndol) newLob.upsytdmgndol = upsytdmgndol;
  // if(upsytdmgnpct) newLob.upsytdmgnpct = upsytdmgnpct;
  // if(dhlytdrev) newLob.dhlytdrev = dhlytdrev;
  // if(dhlytdmgndol) newLob.dhlytdmgndol = dhlytdmgndol;
  // if(dhlytdmgnpct) newLob.dhlytdmgnpct = dhlytdmgnpct;
  // if(ltlytdrev) newLob.ltlytdrev = ltlytdrev;
  // if(ltlytdmgndol) newLob.ltlytdmgndol = ltlytdmgndol;
  // if(ltlytdmgnpct) newLob.ltlytdmgnpct = ltlytdmgnpct;
  // if(totalytdrev) newLob.totalytdrev = totalytdrev;
  // if(totalytdmgndol) newLob.totalytdmgndol = totalytdmgndol;
  // if(totalytdmgnpct) newLob.totalytdmgnpct = totalytdmgnpct;

  const newLob = {
    year,
    upsytdrev,
    upsytdmgndol,
    upsytdmgnpct,
    dhlytdrev,
    dhlytdmgndol,
    dhlytdmgnpct,
    ltlytdrev,
    ltlytdmgndol,
    ltlytdmgnpct,
    totalytdrev,
    totalytdmgndol,
    totalytdmgnpct
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    profile.ytdlobmgn.unshift(newLob);
 

    await profile.save()
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

// @route    DELETE api/profile/ytdlobmgn/:ytdlobmgn_id
// @desc     Delete profile metrics plan
// @access   Private

router.delete('/ytdlobmgn/:ytdlobmgn_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.ytdlobmgn
    .map(item => item.id)
    .indexOf(req.params.ytdlobmgn_id);

    profile.ytdlobmgn.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})
//================

// @route    PUT api/profile/ytdlobact
// @desc     Add YTD LOB Activations
// @access   Private

router.put('/ytdlobact', [auth], async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });

  }

  const {
    year,
    curwkupsact,
    curwkdhlact,
    curwkltlact,
    curwktotalact,
    ytdupsact,
    ytddhlact,
    ytdltlact,
    ytdktotalact
  } = req.body;

  const newAct = {

    year,
    curwkupsact,
    curwkdhlact,
    curwkltlact,
    curwktotalact,
    ytdupsact,
    ytddhlact,
    ytdltlact,
    ytdktotalact
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    profile.ytdlobact.unshift(newAct);
 

    await profile.save()
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})

// @route    DELETE api/profile/ytdlobmgn/:ytdlobmgn_id
// @desc     Delete profile metrics plan
// @access   Private

router.delete('/ytdlobact/:ytdlobact_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.ytdlobact
    .map(item => item.id)
    .indexOf(req.params.ytdlobact_id);

    profile.ytdlobact.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})



module.exports = router;