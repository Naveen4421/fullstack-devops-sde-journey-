require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');

const app = express();

// Allow cross-origin requests from the frontend
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount task routes under /api/tasks
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB, then start server only if connection succeeds
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
