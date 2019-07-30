const  {exec,escape} = require("../db/mysql");

function login(username,password) {
  username=escape(username);
  password=escape(password);

  const sql = `select id from user where username=${username} and password=${password} limit 1;`;
  return  exec(sql);
}


function verify(username) {
  username=escape(username);

  const sql = `select username from user where username=${username} limit 1;`;
  return  exec(sql);
}

function register(username,password,phone) {
  username=escape(username);
  password=escape(password);
  phone=escape(phone);

  const sql = `insert into user (username,password,phone) values (${username},${password},${phone});`;
  return  exec(sql);
}


module.exports = {
  login,
  verify,
  register
}
