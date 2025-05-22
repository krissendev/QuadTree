const path = require('path')



const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

console.log('app.js(express) starting to run...');

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  console.log('Handling GET / request');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//debugging nginx on gcloud
app.get('/health', (req, res) => {
  console.log('Handling GET /health request');
  res.status(200).send('OK');
})

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on 0.0.0.0:${port}`);
});

// app.listen(port,'0.0.0.0', () => {
//   console.log(`Example app listening on port localhost:${port}/`)
// })

// Handle server errors (e.g., port binding issues)
server.on('error', (error) => {
  console.error(`Express server error: ${error.message}`);
  process.exit(1); // Exit to let Supervisor restart
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

