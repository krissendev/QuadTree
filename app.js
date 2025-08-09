const path = require('path')



const express = require('express')

const app = express()
const port = 3000;

console.log('app.js(express) starting to run...');

app.set('trust proxy', 1);


//Added middleware for logging and debugging MIME Content-Type problems
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Headers:', req.headers);
  res.on('finish', () => {
    console.log('Response Content-Type:', res.get('Content-Type'));
  });
  next();
});
app.get('*.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  
  next();
});

// app.use('/', express.static(path.join(__dirname, 'static')))

app.use('/', express.static('static'))

app.get('/', (req, res) => {
  console.log('Handling GET / request');
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
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

