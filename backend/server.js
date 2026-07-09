const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Setup
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to WomenShield API Ecosystem",
        status: "Active",
        track: "SafeSphere Hackathon"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running securely on port ${PORT}`);
});
