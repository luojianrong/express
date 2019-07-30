const app = require("../app");
const {SERVER_CONFIG} = require("../config");

app.listen(SERVER_CONFIG.port,err=>{
  if (err) console.log(err);
  else console.log("服务器请求成功");
});
