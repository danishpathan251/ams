const express = require('express');
const app = express(); // <-- Use express() to create the app
const PORT = 8010;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const attendanceRoute = require('./routes/AttendenceRoute');
const storeRoute = require('./routes/StoreRoute');
const businessRoute = require('./routes/businessRoute');
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/attandance', attendanceRoute);
app.use('/api/store', storeRoute);
app.use('/api/business', businessRoute);



// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express! Updated At: 12:20 ');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
