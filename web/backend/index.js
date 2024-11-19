const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5010;

// Enable CORS for all origins (to allow frontend to access this backend)
app.use(cors({
  origin: 'http://localhost:3000', 
}));

// Function to generate EKG-like data (a random sinusoidal waveform for example)
const generateEKGData = () => {
  const ekgData = Array.from({ length: 10 }, (_, i) => Math.sin(i / 2) + Math.random() * 0.5);
  return ekgData;
};

// Route to get EKG data
app.get('/api/data', (req, res) => {
  res.json({ data: generateEKGData() });
});


// Start the backend server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});