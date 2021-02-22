const express = require("express"); 
const bodyParser = require("body-parser"); 

const app = express();

const PORT = 5000; 

app.use(bodyParser.json()); 

app.get("/", (req, res, next) => {
    res.send("hello world!");
})

app.listen(PORT, () => {
    console.log("port is running"); 
} )