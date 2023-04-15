const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

// Routes
router.post("/createPost", (req, res)=>{
    const {title, body}=req.body
    if(!title || !body){
        return res.status(422).json({error: "Please add all the fields"})
    }
})

module.exports = router