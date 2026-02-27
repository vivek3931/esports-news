import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tournamentRoutes from './routes/tournamentRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import streamRoutes from './routes/streamRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query);
  next();
});

// Authentication Routes
app.use('/api/auth', authRoutes);

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

// Custom API Routes
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/matches', streamRoutes);

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