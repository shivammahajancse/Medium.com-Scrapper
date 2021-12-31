const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/api2',(req,res)=>{
  let array = mod.getjson();
  res.send(array);
});
app.get('/about', (req, res) => {
  res.send('about')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})