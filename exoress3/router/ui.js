const express = require("express");
const {resolve} = require("path");
const  loginCheck = require("../middleware/login-check")

const router = new express.Router();

router.get('/user.html',loginCheck,(req,res)=>{

    res.sendFile(resolve(__dirname,"../views","user.html"));
});

module.exports = router;
