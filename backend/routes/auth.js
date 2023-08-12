import express from 'express';
import mongoose from 'mongoose';
import '../../backend/models/user.js'
import bcryptjs from 'bcryptjs';

const router = express.Router();
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.send("hello from routes");
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        res.status(422).json({ error: "please add alll details" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({ error: "User already exists with that email" })
            }
            bcryptjs.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name:name,
                        email:email,
                        password: hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "Saved successfully on database" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })

});


export default router;