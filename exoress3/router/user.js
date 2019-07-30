const express = require("express");
const {login,verify,register} = require('../control/user');

//创建路由的实例对象
const router = new express.Router();

//登录功能
router.post('/login',async (req,res)=>{
  //获取请求体参数
  const {username,password} = req.body;
  const  user = await login(username,password);
  console.log(user);

  if (user.length){
    req.session.userId = user[0].id;
    console.log(req.session.userId);
    res.redirect("http://localhost:3000/user.html");
  } else {
    res.send("用户名或密码错误");
  }
})


//注册功能
router.post('/register',async (req,res)=>{
  let {username,password,phone} = req.body;
  username = escape(username);
  password = escape(password);
  phone = escape(phone);

  const sql = `select username from user where username=${username} limit 1;`;
  const user = await verify(username);
  if (user.length){
    res.send("用户已经存在");
  } else {
    register(username,password,phone);
    res.send("用户注册成功");
  }
})


module.exports = router;
