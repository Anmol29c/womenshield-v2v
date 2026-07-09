#!/bin/bash

echo "🚀 WomenShield-v2v Workspace Setup Start Ho Raha Hai..."

# 1. Folders Create Karna
mkdir -p src/components src/pages src/utils
mkdir -p backend/routes backend/controllers docs

echo "📂 Folders successfully ban gaye!"

# 2. .gitignore Create Karna
cat << 'EOF' > .gitignore
node_modules/
.pnp
.pnp.js
coverage/
.next/
out/
build/
dist/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
EOF
echo "📄 .gitignore file ready!"

# 3. package.json Create Karna
cat << 'EOF' > package.json
{
  "name": "womenshield-v2v",
  "version": "1.0.0",
  "description": "Women's Safety & Security Tech - SafeSphere Track",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
EOF
echo "📄 package.json ready!"

# 4. Backend Server Code (backend/server.js)
cat << 'EOF' > backend/server.js
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
EOF
echo "🖥️ backend/server.js ready!"

# 5. Backend Routes (backend/routes/auth.js)
cat << 'EOF' > backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST api/auth/register
router.post('/register', registerUser);

// @route   POST api/auth/login
router.post('/login', loginUser);

module.exports = router;
EOF
echo "🛣️ backend/routes/auth.js ready!"

# 6. Backend Controller (backend/controllers/authController.js)
cat << 'EOF' > backend/controllers/authController.js
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully (Demo Active)",
            user: { name, email, phone }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        res.status(200).json({
            success: true,
            message: "User logged in successfully (Demo Active)"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
EOF
echo "🎮 backend/controllers/authController.js ready!"

# 7. Setup Guide (docs/SETUP.md)
cat << 'EOF' > docs/SETUP.md
# ⚙️ Setup & Installation Guide

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Quick Start
1. Install Dependencies:
   ```bash
   npm install`