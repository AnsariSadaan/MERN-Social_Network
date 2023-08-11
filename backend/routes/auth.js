import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("hello from routes");
})

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        res.json({error: "please add alll details"})
    }
    res.json({messgae: "Successfully posted"});
});


export default router;