import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query);
  next();
});

// News API Proxy
app.get('/api/news', async (req, res) => {
  try {
    const { q, sortBy, language, pageSize, page } = req.query;

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: q || 'esports',
        sortBy: sortBy || 'publishedAt',
        language: language || 'en',
        pageSize: pageSize || 20,
        page: page || 1,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    
    console.log('News API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('News API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});

// PandaScore API Proxy - Tournaments
app.get('/api/tournaments', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/tournaments', {
      headers: { 
        'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        sort: req.query.sort || '-begin_at',
        page: req.query.page || 1,
        per_page: req.query.per_page || 50,
        ...req.query,
      },
    });
    
    console.log('Tournaments API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Tournaments API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data || error.message 
    });
  }
});

// PandaScore API Proxy - Teams
app.get('/api/teams', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/teams', {
      headers: { 
        'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        page: req.query.page || 1,
        per_page: req.query.per_page || 50,
        ...req.query,
      },
    });
    
    console.log('Teams API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Teams API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data || error.message 
    });
  }
});

// PandaScore API Proxy - Games
app.get('/api/games', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/videogames', {
      headers: { 
        'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        page: req.query.page || 1,
        per_page: req.query.per_page || 50,
        ...req.query,
      },
    });
    
    console.log('Games API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Games API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data || error.message 
    });
  }
});

// PandaScore API Proxy - Upcoming Matches
app.get('/api/matches/upcoming', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/matches/upcoming', {
      headers: { 
        'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        sort: req.query.sort || 'begin_at',
        page: req.query.page || 1,
        per_page: req.query.per_page || 50,
        ...req.query,
      },
    });
    
    console.log('Upcoming Matches API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Upcoming Matches API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data || error.message 
    });
  }
});

// PandaScore API Proxy - Live Matches
app.get('/api/matches/running', async (req, res) => {
  try {
    const response = await axios.get('https://api.pandascore.co/matches/running', {
      headers: { 
        'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        sort: req.query.sort || 'begin_at',
        page: req.query.page || 1,
        per_page: req.query.per_page || 50,
        ...req.query,
      },
    });
    
    console.log('Live Matches API Response:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Live Matches API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data || error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📰 News API Key: ${process.env.NEWS_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`🎮 PandaScore API Key: ${process.env.PANDASCORE_API_KEY ? '✓ Set' : '✗ Missing'}`);
});