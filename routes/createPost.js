const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const POST = mongoose.model("POST")

// Routes
router.get("/allPosts", requireLogin, (req, res)=> {
    POST.find()
    .populate("postedBy","_id, name")
    .then(posts=> res.json(posts))
    .catch(err=>console.log(err))
})

router.post("/createPost", requireLogin,(req, res)=>{
    const {body, pic}=req.body
    if(!body || !pic){
        return res.status(422).json({error: "Please add all the fields"})
    }
    const post = new POST({
        body,
        photo : pic,
        postedBy: req.user
    })
    
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/myposts",requireLogin ,(req, res)=>{
    POST.find({postedBy: req.user._id})
    .populate("postedBy", "_id name")
    .then(myposts => res.json(myposts))
})

module.exports = router