const  {exec,escape} = require("../db/mysql");

function login(username,password) {
  const sql = `select id from user where username=${username} and password=${password} limit 1;`;
  return  exec(sql);
}


function verify(username) {
  const sql = `select username from user where username=${username} limit 1;`;
  return  exec(sql);
}

function register(username,password,phone) {
  const sql = `insert into user (username,password,phone) values (${username},${password},${phone});`;
  return  exec(sql);
}

function escapes(fn){
  return (...args)=>{
    const newArgs = args.map(arg=> escape(arg));
    return fn(...newArgs);
  }
}


module.exports = {
  login: escapes(login),
  verify: escapes(verify),
  register: escapes(register)
};
