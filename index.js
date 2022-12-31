const express = require('express');
const cors = require('cors');
require('colors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Fact Share server is running');
});

//* Mongodb Atlas

//* -------------------------GET(READ)-------------------------

//* -------------------------POST(CREATE)-------------------------

app.listen(port, () => {
  console.log('Server up and running'.cyan.bold);
});
