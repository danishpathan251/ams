const express = require('express');
const app = express(); // <-- Use express() to create the app
const PORT = 8010;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);


// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express! /api/auth/login /signup');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
