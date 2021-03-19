const express = require('express');
const app = express();
const pool = require('./db');
const port = 5000;

//=====================
//     Middleware
//=====================
app.use(express.json()); // => req.body

//=====================
//      Routes
//=====================
app.get('/', (req, res) => {
  res.send('Received!')
})

app.post('/', (req, res) => {
  res.send('Posted!')
})

app.put('/', (req, res) => {
  res.send('Updated!')
})

app.delete('/', (req, res) => {
  res.send('Deleted!')
})

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`)
})
