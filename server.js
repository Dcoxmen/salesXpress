const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }))

//Index Route
app.get('/', (req, res) => {
    res.send('INDEX SALE PAGE')
});

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/district', require('./routes/api/district'));
app.use('/api/region', require('./routes/api/region'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});