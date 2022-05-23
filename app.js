const express = require('express');
const app = express();
const con = require('./config/dbconfig')

app.use('/',require('./routes/route'))

app.listen(8080,()=>{
    console.log("Server listing on port 8080")
})