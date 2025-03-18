const path = require('path')



const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}/`)
})
