const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const BETLOY_API_KEY = process.env.BETLOY_API_KEY;

app.post('/api/convert', async (req, res) => {
  try {
    const response = await axios.post('https://betloy.com/api/v1/convert', req.body, {
      headers: {
        'Authorization': `Bearer ${BETLOY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.response?.data?.message || 'Error' });
  }
});

app.get('/api/bookmakers', async (req, res) => {
  try {
    const response = await axios.get('https://betloy.com/api/v1/bookmakers', {
      headers: { 'Authorization': `Bearer ${BETLOY_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load bookmakers' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running`));
