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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})