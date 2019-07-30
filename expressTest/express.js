/*
//1、引入
const  express = require("express");
const  cookieParser = require("cookie-parser");
const session = require("express-session");

//2、创建app
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  cookie:{
    maxAge:3600*24*7,
    httpOnly:true,
    paht:"/"
  },
  secret:"343drek",  //设置加密
  saveUninitialized:false  //不会强制保存，需要保存内容才会存section

}));

//4、设置路由处理请求
app.get('/test1',(req,res)=>{
  //5、获取请求参数
  console.log(req.query);
  //解析cookie
  console.log(req.cookies);

  //解析session


  res.send('这是服务器返回的响应')

});

app.post('/test2',(req,res)=>{
  //获取请求体参数
  console.log(req.body);

  res.send('这是服务器返回的响应')
});

//3、监听端口号
app.listen(3000,err=>{
  if(err) console.log(err);
  else console.log("服务器连接成功");
})
*/

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({
  cookie:{
    maxAge: 360*24*7,
    httpOnly:true,
    path:"/"
  },
  secret:"jks",
  saveUninitialized:false
}));


app.get('/test1',(req,res)=>{
  console.log(req.query);
  console.log(req.cookies);
  console.log(req.session);

  res.send("这是服务器的响应");

});

app.post('/test2',(req,res)=>{
  console.log(req.body);
  res.send("这是服务器的响应");
});

app.listen(3000,err=>{
  if (err) console.log(err);
  else console.log("服务器启动成功");
})
