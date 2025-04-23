const express = require('express');
const app = express(); // <-- Use express() to create the app
const PORT = 8010;

// Middleware
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
