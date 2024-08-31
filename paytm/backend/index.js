const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express();
app.use(cors())
app.use(express.json())

const mainRoute = require("./routes/index");
app.use("/api/v1/", mainRoute);



app.listen(3000, ()=>{
    console.log("server is running");
    
});


