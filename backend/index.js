 import express  from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import routerAuth from './routes/auth.js';
import routerPost from './routes/post.js';
import routerUser from './routes/user.js';


const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(routerAuth);
app.use(routerPost);
app.use(routerUser);



const CONNECTION_URL = 'mongodb+srv://socialnetwork:socialnetwork@cluster0.fxkbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 

mongoose.connect(CONNECTION_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => { console.log(err) })

app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON:",PORT) //Terminal
})