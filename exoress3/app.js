const  express = require("express");
const {resolve} = require("path");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const morgan = require('morgan');
const {createWriteStream} = require('fs');


const userRouter = require("./router/user");
const uiRouter = require("./router/ui");
const {REDIS_CONFIG} = require("./config");

const app = express();

const filePath = resolve(__dirname,"public");
app.use(express.static(filePath));
app.use(express.urlencoded({extended:true}));

// 记录访问日志
const accessWriteStream = createWriteStream(resolve(__dirname, './log', 'access.log'), { flags: 'a' });
app.use(morgan('combined', {
  stream: accessWriteStream
}));

// 记录错误日志
const errorWriteStream = createWriteStream(resolve(__dirname, './log', 'error.log'), { flags: 'a' });
app.use(morgan('tiny', {
  stream: errorWriteStream,
  skip: function (req, res) { return res.statusCode < 400 }
}));

// 使用session
app.use(session({
  //使用redis保存session
  store: new RedisStore({
    // localhost:6379
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    // session对象在redis中保存的时间
    ttl: 3600 * 24 * 7
  }),
  secret: 'Class0425 HTML ^_^',
  resave: false,
  cookie: {
    maxAge: 3600 * 24 * 7,
    httpOnly: true
  },
  saveUninitialized: true,
}));


//使用路由器
app.use(userRouter);
app.use(uiRouter);

//暴露app
module.exports = app;
