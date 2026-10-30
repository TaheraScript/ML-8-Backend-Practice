import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());
app.use(express.json())

const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-jzpvg2z-shard-00-00.sq6hc5o.mongodb.net:27017,ac-jzpvg2z-shard-00-01.sq6hc5o.mongodb.net:27017,ac-jzpvg2z-shard-00-02.sq6hc5o.mongodb.net:27017/?ssl=true&replicaSet=atlas-lorrmj-shard-0&authSource=admin`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient =await connectToMongoDB()

const db = mongoClient.db('wanderlust')
const destinationCollection = db.collection('destination')

app.post('/add-destination', async (req,res)=>{
const data = req.body
   
    const result = await destinationCollection.insertOne(data)
     console.log(result)
    res.send(result)
})

app.get('/destinations',async(req,res)=>{
    const result = await destinationCollection.find().toArray()
    res.send(result)
})

app.get('/destination/:id',async(req,res)=>{
    console.log(req.params)
    const id = req.params.id
    const query ={_id: new ObjectId(id)}
    const result = await destinationCollection.findOne(query)
    res.send(result)
})

// ADDED: update a destination (used by the Edit dialog)
app.patch('/destination/:id', async (req, res) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    )
    res.send(result)
})

app.delete('/destination/:id',async(req,res)=>{
    const id =req.params.id
    const query ={_id: new ObjectId(id)}
    const result =await destinationCollection.deleteOne(query)
    res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});