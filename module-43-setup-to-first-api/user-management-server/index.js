import express from 'express';
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World from Express.js')
})
const users =[
    {id:1, name:'Kabul', email: 'kabul@gmail.com'},
    {id:1, name:'Babul', email: 'babul@gmail.com'},
    {id:1, name:'Abul', email: 'abul@gmail.com'},
    {id:1, name:'Gabul', email: 'gabul@gmail.com'}
]
app.get('/users', (req, res) =>{
    res.send(users)
})
app.post('/users',(req, res)=>{
  console.log('data from client', req.body )
  const newUser = req.body
  newUser.id = users.length + 1
  users.push(newUser)
  res.send({success : true, message : 'user added successfully'})
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})