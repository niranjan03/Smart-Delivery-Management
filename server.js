const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config();
const app = express()
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

const PORT= process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const partnerRoutes = require('./routes/partners');
const orderRoutes = require('./routes/orders');
const assignmentRoutes = require('./routes/assignments');

// Use routes
app.use('/api/partners', partnerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assignments', assignmentRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})