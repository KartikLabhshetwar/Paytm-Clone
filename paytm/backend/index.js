const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express();
app.use(cors())
app.use(express.json())

const mainRoute = require("./routes/index");
app.use("/api/v1/", mainRoute);

const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log("server is running");
    
});


