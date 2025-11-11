import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import projectRoutes from './routes/project.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import contactRoutes from "./routes/contact.js";


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/contact", contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API! Again' });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});