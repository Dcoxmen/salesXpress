const express = require('express');
const connectDB = require('./config/db');
const xpressUpload = require('express-fileupload');
const app = express();




//Connect DB
connectDB();

//Init Middleware to use req.body from body parser
app.use(express.json({ extended: false }))

//Index Route
app.get('/', (req, res) => {
    res.send('INDEX SALE PAGE')
});

app.use(xpressUpload());
// Upload Endpoint

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/region', require('./routes/api/region'));

app.post('/uploads', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/client/src/views/pdf/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});