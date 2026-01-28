const express = require('express');
const app = express();
const port = 3001;

// middleware
app.use(express.json());

// route
app.get('/', (req, res) => {
  res.send('Hello Express 👋');
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});