 import express  from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"
import routerAuth from './routes/auth.js';
import routerPost from './routes/post.js';
import routerUser from './routes/user.js';


const PORT = 5000;
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(routerAuth);
app.use(routerPost);
app.use(routerUser);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => { console.log(err) })

app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON:",PORT) //Terminal
})