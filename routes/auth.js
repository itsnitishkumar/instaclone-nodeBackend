const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt')


router.get('/', (req, res)=>{
    res.send("hello")
})

router.post('/signup', (req, res)=>{
    const {name, userName, email, password} = req.body;
  
    if(!name || !email || !userName || !password){
        return res.status(422).json({error: 'Please add all the fields'})
    }

    USER.findOne({$or:[{email: email},{userName: userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: 'User already exits with given email or username'})
        }
        bcrypt.hash(password, 12).then((hashedPassword)=>{
                const user = new USER({
                    name,
                    email,  
                    userName,
                    password: hashedPassword
                })

                user.save()
                .then(user => { res.json({ message: 'saved successfully'}) })
                .catch(err => { console.log(err) });
            })
        })
})

router.post('/signin', (req,res)=>{
    const {email, password} = req.body

    if(!email || !password){
        console.log('Email and Password is needed');
    }

    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error: "Invalid email"})
        }
        bcrypt.compare(password, savedUser.password)
        .then((match)=> {
            if(match)
                return res.status(200).json({message: 'Signed in successfully'})
            else
                return res.status(422).json({message: 'Invalid password'})
        })
    })
})

module.exports = router