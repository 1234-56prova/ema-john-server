const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const { query } = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltwfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const productsCollection = client.db('dbJohn').collection('products');
        
        app.get('/product', async(req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();

            res.send(products);
        })
        
        
        console.log('mongo is connected')
    }
    finally {
// client.close();
    }
}

run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.get('/', (req, res) => {
    res.send('ema john is runnning');
})

app.listen(port, () => {
    console.log('ema is running', port);
})