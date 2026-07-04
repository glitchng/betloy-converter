require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const BETLOY_API_KEY = process.env.BETLOY_API_KEY;
const BASE_URL = 'https://betloy.com/api/v1';

if (!BETLOY_API_KEY) {
  console.error("❌ BETLOY_API_KEY is missing in environment variables");
}

// Convert endpoint
app.post('/api/convert', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/convert`, req.body, {
      headers: {
        'Authorization': `Bearer ${BETLOY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Conversion failed'
    });
  }
});

// Bookmakers list
app.get('/api/bookmakers', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/bookmakers`, {
      headers: { 'Authorization': `Bearer ${BETLOY_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load bookmakers' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
