const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yeflywl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log('Database connected'.yellow.italic);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
};

dbConnect();

//* Collections
const allFactCollection = client.db('factShareDBUser').collection('allFact');
const categoriesCollection = client
  .db('factShareDBUser')
  .collection('categories');

//* -------------------------GET(READ)-------------------------
// get all categories
app.get('/categories', async (req, res) => {
  try {
    const query = {};
    const categories = await categoriesCollection.find(query).toArray();
    res.send(categories);
  } catch (error) {
    console.log(error.message.bold);
  }
});

//* -------------------------POST(CREATE)-------------------------
// post fact data
app.post('/facts', async (req, res) => {
  try {
    const task = req.body;
    const result = await allFactCollection.insertOne(task);
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

app.listen(port, () => {
  console.log('Server up and running'.cyan.bold);
});
