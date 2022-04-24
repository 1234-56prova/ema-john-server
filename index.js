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
            console.log('query', req.query);
            const page = parseInt(req?.query?.page);
            const size = parseInt(req?.query?.size);

            const query = {};
            const cursor = productsCollection.find(query);
            let products;
            if (page || size){
                products = await cursor.skip(page*size).limit(size).toArray();
            }
             else {
                products = await cursor.toArray();
             }
            

            res.send(products);
        })
        
        app.get('/productCount', async(req, res) => {
            const count = await cursor.estimatedDocumentCount();
            res.send({count});
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