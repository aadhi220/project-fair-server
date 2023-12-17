require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Routes/router");
require('./DB/connection')
const pfServer = express();
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT =4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`project showcase server started at port :${PORT} and waiting for client request `);
})
// http get 
pfServer.get('/',(req,res)=>{

    res.send(`<h1> Server successfully started running on port ${PORT} </h1> <h3><a href="https://project-showcase-mern.vercel.app/" >Redirect to website frontend </a></h3>`)
})

pfServer.post('/',(req,res)=>{
    res.send("post reqest");
})

pfServer.put('/',(req,res)=>{
    res.send("PUT reqest");
})