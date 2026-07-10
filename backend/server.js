import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors());
app.use(express.json());

// MongoDB Local Connection Setup
// Default local fallback connection string if process.env.MONGO_URI is missing
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hello_docker_db';

mongoose.connect(mongoURI)
  .then(() => console.log('🔌 Successfully integrated with MongoDB Storage Engine'))
  .catch((err) => console.error('❌ MongoDB database connection initialization failed:', err));

// Database Schema Definition for Logged Intersections
const userLogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  greeting: { type: String, required: true },
  ipAddress: { type: String, required: true },
  locationBoundary: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Compilation of the schema definition into an operational Mongoose Model
const UserLog = mongoose.model('UserLog', userLogSchema);

// Main Core Routing Matrix for Greeting Generation and Telemetry Data Processing
app.post('/api/greet', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Payload missing critical attribute: name' });
  }

  // 1. Dynamic Server Time-Based Greeting Engine Logic
  const currentHour = new Date().getHours();
  let dynamicGreeting = '';

  if (currentHour >= 5 && currentHour < 12) {
    dynamicGreeting = `Good morning, ${name}! 🌅 New day, fresh code container awaiting deployment!`;
  } else if (currentHour >= 12 && currentHour < 17) {
    dynamicGreeting = `Good afternoon, ${name}! ☀️ Keep compiling, keep containerizing!`;
  } else if (currentHour >= 17 && currentHour < 22) {
    dynamicGreeting = `Good evening, ${name}! 🌆 Unwind with coffee, refactor with Docker!`;
  } else {
    dynamicGreeting = `Hello night owl, ${name}! 🌙 Midnight architectures create digital history!`;
  }

  // 2. Client Ingress IP Identification Strategy
  let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (userIp === '::1' || userIp === '127.0.0.1') {
    userIp = '127.0.0.1 (LocalHost)';
  }

  // 3. Geographic Edge Location Fallback Resolution
  const location = userIp.includes('127.0.0.1') ? 'Bhopal, MP 📍 (H110 Dev PC)' : 'Cloud Network Edge ☁️';

  try {
    // 4. Data Persistence Operations Sequence
    const logEntry = new UserLog({
      name,
      greeting: dynamicGreeting,
      ipAddress: userIp,
      locationBoundary: location
    });

    await logEntry.save();
    console.log(`💾 Database transaction verified and sealed for user: ${name}`);

    // 5. Client Payload Dispatch
    res.json({
      greeting: dynamicGreeting,
      serverTime: new Date().toLocaleTimeString(),
      ip: userIp,
      location: location
    });

  } catch (error) {
    console.error('Database write execution failed during transaction sequence:', error);
    res.status(500).json({ error: 'Internal data persistency engine fault encountered' });
  }
});

// Initialize server socket listeners
app.listen(PORT, () => {
  console.log(`🚀 Node Engine operational! Gateway open on port ${PORT}...`);
});