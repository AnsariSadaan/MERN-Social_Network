const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
PORT = 6969;

const customMiddleware = (req, res, next)=>{
    console.log("Middleware Executed!!!");
    next();
}

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// app.use(customMiddleware);

app.get('/', (req, res)=>{
    res.send('<h1>i am home page from the backend</h1>')
    console.log("hello from /");
})

app.get('/about', customMiddleware, (req, res) => {
    res.send('<h1>i am about page from the backend</h1>')
})

const CONNECTION_URL = "mongodb+srv://socialnetwork:socialnetwork@socialnetwork.bngowcu.mongodb.net/";
mongoose.connect(CONNECTION_URL).then(() => { console.log(`server database is running on port no: ${PORT}`)});


app.listen(PORT, ()=>{
    console.log(`server is running on port no: ${PORT}`)
})