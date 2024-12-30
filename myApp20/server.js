const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/tours",{useNewUrlParser: true})
.then(()=>{
    console.log("Successfully connected to database")
}).catch((err)=>{
    console.log("Could not connect to database", err);
    process.exit();
})

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.json({message:"Server is running"});
})

require("./routes/app.routes.js")(app);

let port = 8000;
app.listen(port,()=>{
    console.log("Server is running on port 8000");
});