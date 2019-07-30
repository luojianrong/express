const express = require("express");
const {resolve} = require("path");

const router = new express.Router();

router.get('/user.html',(req,res)=>{
  const filePath = resolve(__dirname,'../views',"user.html");
  console.log(req.session.userId);
  if (req.session.userId){
    res.sendFile(filePath)
  } else{
    res.redirect("http://localhost:3000/login.html");
  }
});

module.exports = router;
