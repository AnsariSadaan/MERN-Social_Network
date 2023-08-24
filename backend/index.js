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
app.use(cors({
    origin: 'https://social-network-nine-pink.vercel.app'
}));
app.use(express.json());
app.use(routerAuth);
app.use(routerPost);
app.use(routerUser);

const allowedOrigins = [
    'https://social-network-blond.vercel.app/',
    'https://another-allowed-origin.com'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => { console.log(err) })

app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON:",PORT) //Terminal
})
