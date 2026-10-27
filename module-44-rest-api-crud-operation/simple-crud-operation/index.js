import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)

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
await connectToMongoDB()

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})