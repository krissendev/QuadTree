const path = require('path')



const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//debugging nginx on gcloud
app.get('/health', (req, res) => {
  res.status(200).send('OK');
})

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port localhost:${port}/`)
})


