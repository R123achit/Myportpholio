import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import codingStatsRoutes from './routes/codingStatsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://your-frontend.vercel.app', // Replace with your actual frontend URL
        /\.vercel\.app$/ // Allow all Vercel preview deployments
      ]
    : '*', // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - Welcome message
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Portfolio Backend API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      contact: '/api/contact',
      chatbot: '/api/chatbot',
      github: '/api/github',
      codingStats: '/api/coding-stats'
    },
    documentation: 'Visit /api/health to check server status'
  });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/coding-stats', codingStatsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't exit process - allow server to run even if DB is not available
    console.log('⚠️  Server will run without database connection');
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});

export default app;
