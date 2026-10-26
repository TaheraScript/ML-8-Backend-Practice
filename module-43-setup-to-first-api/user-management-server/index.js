import express from 'express';
const app = express()
const PORT = process.env.PORT || 5000

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})