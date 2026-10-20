import express from 'express';
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World from Express.js')
})
app.get('/about', (req, res) =>{
    res.send('About Section')
})
app.get('/dashboard',(req,res)=>{
    res.send('Dahsboard Section')
})
app.get('/work',(req,res)=>{
    res.send('Work Section')
})
app.get('/contact', (req, res) =>{
    res.send('Contact Section')
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