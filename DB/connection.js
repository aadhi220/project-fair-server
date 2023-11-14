const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=> {
console.log("mongodb Atlas successfully connected with pfsever");
}).catch((error)=> {
    console.log(`mongodb connection failed . error : ${error}`);
})