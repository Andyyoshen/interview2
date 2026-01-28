const createApp = require('./app');

const PORT = process.env.PORT || 3000;

const { app } = createApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Messages API: POST http://localhost:${PORT}/messages`);
});
