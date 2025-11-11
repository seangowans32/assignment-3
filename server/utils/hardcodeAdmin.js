import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
dotenv.config({ path: './server/.env' });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = 'seangowans32@gmail.com';
    const password = '123456789';
    const name = 'Admin';

    const existing = await User.findOne({ email });

    if(existing) {
      if(existing.role !== 'admin') {
        existing.role = 'admin';
        existing.password = password;
        await existing.save();
      }

      console.log('Admin ensured:', email);

    } else {
      await User.create({ name, email, password, role: 'admin' });
      console.log('Admin created:', email);
    }

  } catch (err) {
    console.error('Failed:', err.message);

  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();