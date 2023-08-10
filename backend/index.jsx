const express = require('express');
const cors = require('cors');
const app = express();
PORT = 6969

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res)=>{
    res.send('<h1>from the backend</h1>')
})


app.listen(PORT, ()=>{
    console.log(`server is running on port no ${PORT}`)
})