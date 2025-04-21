const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 5000;

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Sample GET route (for Postman testing)
app.get('/api/data', (req, res) => {
  res.json({ message: 'GET request received successfully' });
});

// Sample POST route (for Postman testing)
app.post('/api/data', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  console.log(`Received data: Name = ${name}, Email = ${email}`);
  res.json({ message: 'POST request received successfully', data: { name, email } });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
