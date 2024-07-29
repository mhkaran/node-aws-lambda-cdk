const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/health',(req,res)=>{
    res.send('Api is working fine!');
});

module.exports.handler = serverless(app)