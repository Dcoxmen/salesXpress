const express = require('express');
const router = express.Router();

//@route  GET api/region
//@desc   Test route
//@access Public
router.get('/', (req, res) => {
    res.send('Region Route View')
});

module.exports = router;