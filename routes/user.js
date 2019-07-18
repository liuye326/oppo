const express = require("express");
const pool = require("../pool");
const bodyParser = require("body-parser");
var router = express.Router();
router.use( bodyParser.urlencoded({
  extended:false
}));
//验证用户是否存在
router.post("/login",(req,res)=>{
  console.log(req.body);
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  console.log(uname,upwd);
  if(!uname){
    res.send({code:-3,msg:"uname不能为空"});
    return; 
  };
  if(!upwd){
    res.send({code:-2,msg:"upwd不能为空"});
    return;
  };
  pool.query("SELECT * FROM user_list WHERE uname=? AND upwd = md5(?)",[uname,upwd],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
          res.send({code:1,msg:"登陆成功",uid:result[0].uid});
      }else{
          res.send({code:-1,msg:"用户名或密码错误"});
      } 
  });
})
//注册用户
router.post("/regist",(req,res)=>{
  console.log(req.body);
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  var place = req.body.place;
  console.log(place);
  if(!place){
    res.send({code:-4,msg:"place不能为空"});
    return;
  }
  if(!uname){
    res.send({code:-3,msg:"uname不能为空"});
    return; 
  };
  if(!upwd){
    res.send({code:-2,msg:"uname不能为空"});
    return; 
  };
  pool.query("INSERT INTO user_list (`uid`, `uname`, `upwd`, `place`) VALUES (NULL,?,md5(?),?);",[uname,upwd,place],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
        res.send({code:1,msg:"注册成功"});
    }else{
        res.send({code:-1,msg:"注册失败"});
    } 
  });
})
//获取国家、地区列表
router.get("/place",(req,res)=>{
  pool.query("SELECT pid,pname,title FROM place_list",(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
module.exports = router;