const express = require('express');
const router = express.Router();

//@route  GET api/district
//@desc   Test route
//@access Public
router.get('/', (req, res) => {
    res.send('District Route View')
});

module.exports = router;