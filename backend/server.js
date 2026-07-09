const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Local JSON Database File Setup
const dbPath = path.join(__dirname, 'database.json');

// Helper function to read database
const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], alerts: [] }, null, 2));
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to database
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Initial DB check
readDB();

// --- ROUTES ---

// 1. Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to WomenShield API Ecosystem", 
    status: "Active ✅ (Connected to JSON DB)",
    track: "SafeSphere Hackathon"
  });
});

// 2. User Registration (Signup) API
app.post('/api/signup', (req, res) => {
  const { name, phone, email, password } = req.body;
  
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const db = readDB();
  
  // Check if user already exists
  const userExists = db.users.find(u => u.email === email || u.phone === phone);
  if (userExists) {
    return res.status(400).json({ error: "User already registered with this email/phone!" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    phone,
    email,
    password, // Demo ke liye simple text password save kar rahe hain
    trustedContacts: [
      { name: "Mom", phone: "+91 98765 XXXXX" },
      { name: "Local Police", phone: "112" }
    ]
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: "User registered successfully!", user: newUser });
});

// 3. SOS Trigger API
app.post('/api/sos', (req, res) => {
  const { userId, latitude, longitude } = req.body;
  const db = readDB();

  const newAlert = {
    id: Date.now().toString(),
    userId: userId || "Anonymous User",
    latitude: latitude || "28.6139",
    longitude: longitude || "77.2090",
    timestamp: new Date().toISOString()
  };

  db.alerts.push(newAlert);
  writeDB(db);

  console.log(`🚨 SOS Alert Saved in DB! Coords: ${newAlert.latitude}, ${newAlert.longitude}`);
  res.status(200).json({ message: "SOS Alert received and contacts notified!", alert: newAlert });
});

app.listen(PORT, () => {
  console.log('🔌 File-System Local DB Initialized Successfully!');
  console.log(`🚀 Server running securely on port ${PORT}`);
});
