import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import projectRoutes from './routes/project.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize app
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API! Again' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});