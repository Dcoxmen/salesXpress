const express = require('express');
const router = express.Router();


//@route  GET api/uploads
//@desc   Test route
//@access Private

router.get('/', (req, res) => {
    res.send('Uploads Route View')
});


// router.post('/', (req, res) => {
//     if (req.files === null) {
//       return res.status(400).json({ msg: 'No file uploaded' });
//     }
  

  
//     file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send(err);
//       }
  
//       res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//     });
//   });
  

module.exports = router;