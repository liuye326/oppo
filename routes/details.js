const express = require("express");
const pool = require("../pool");
const bodyParser = require("body-parser");
var router = express.Router();
router.use( bodyParser.urlencoded({
    extended:false
}));

//获取商品信息
router.get("/getlist",(req,res)=>{
  var col_id = req.query.col_id;
  var con_id = req.query.con_id;
  if(!col_id){
    res.send({code:-2,msg:"col_id不能为空"});
    return;
  }
  if(!con_id){
    res.send({code:-1,msg:"con_id不能为空"});
    return;
  }
  var arr = [];
  var pic_id;
  pool.query("select * from phone_list where color_id=? AND config_id=?",[col_id,con_id],(err,result)=>{
    if(err) throw err;
    arr[0] = result[0];
    pic_id = result[0].pic_id;
    pool.query("select * from pic_list where pid = ?",[pic_id],(err,result)=>{
      if(err) throw err;
      arr[1] =  result[0];
      pool.query("select * from color_list",(err,result)=>{
        if(err) throw err;
        arr[2] = result;
        pool.query("select * from config_list",(err,result)=>{
          if(err) throw err;
          arr[3] = result;
          var sql = "SELECT aid ,title ,price,url, pic_url FROM acce_list where a_type = 'dataLink' ORDER BY aid ASC";
          pool.query(sql,(err,result)=>{
            if(err) throw err;
            arr[4] = result;
            res.send(arr);
          })
        })
      })
    })
  })
})
//获取购物车信息
router.get("/getcart",(req,res)=>{
  var pids = req.query.pids;
  if(!pids){
    res.send({code:-1,msg:"pids不能为空"})
  }
  var sql = `select * from phone_list where pid in (${pids})`;
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
module.exports = router;