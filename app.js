const express = require('express');
const req = require('express/lib/request');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./model/database.js');
const mod = require(path.join(__dirname, 'controller', 'script.js'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/api2',(req,res)=>{
  let array = mod.getjson();
  res.send(array);
});

app.get('/history',(req,res)=>{
  db.performsqlquery();
  res.sendFile(path.join(__dirname,'view','history.html'));
});

app.get('/gethistory',(req,res)=>{
  let object = db.displaysqlquery();
  res.send(object);
})

app.post('/api',(req,res)=>{
  mod.search(req.body.tagname);
  db.insertsqlquery(req.body.tagname);
  res.sendStatus(200);
});


// app.get('/about', (req, res) => {
//   res.send('about')
// })
app.listen(port);