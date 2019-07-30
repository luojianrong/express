
const mysql = require("mysql");
const {MYSQL_CONFIG} = require("../config");

const connection =  mysql.createConnection(MYSQL_CONFIG);

connection.connect(err=>{
  if (err) console.log(err);
  else console.log("数据库连接成功");
});

function exec(sql){
  return new Promise((resolve, reject) => {
    connection.query(sql,(err,result)=>{
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape
};
