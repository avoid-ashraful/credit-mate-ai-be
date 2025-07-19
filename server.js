const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Hello World endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Additional hello endpoint
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World from /hello endpoint!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});