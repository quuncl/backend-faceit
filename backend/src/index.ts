import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import telegramRoutes from './api/telegram';
import mamontRoutes from './api/mamont';
import teamsRoutes from './api/teams';
import uploadRoutes from './api/upload';
import step1Routes from './api/step1';

// Use routes
app.use('/api/telegram', telegramRoutes);
app.use('/api/mamont', mamontRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/step1', step1Routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 