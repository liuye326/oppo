const express = require("express");
const pool = require("../pool");
const bodyParser = require("body-parser");
var router = express.Router();
router.use( bodyParser.urlencoded({
    extended:false
}));
//获取goodsc列表
router.get("/goodsc",(req,res)=>{
  var arr = [];
  var sql = "SELECT aid ,title ,price,url, pic_url FROM acce_list where a_type = ? ORDER BY aid ASC"
  pool.query(sql,["recommend"],(err,result)=>{
    if(err) throw err;
    arr[0] = result;
    pool.query(sql,["ear"],(err,result)=>{
      if(err) throw err;
      arr[1] = result;
      pool.query(sql,["dataLink"],(err,result)=>{
        if(err) throw err;
        arr[2] = result;
        pool.query(sql,["powerBank"],(err,result)=>{
          if(err) throw err;
          arr[3] = result;
          pool.query(sql,["setMeal"],(err,result)=>{
            if(err) throw err;
            arr[4] = result;
            pool.query(sql,["crust"],(err,result)=>{
              if(err) throw err;
              arr[5] = result;
              pool.query(sql,["else"],(err,result)=>{
                if(err) throw err;
                arr[6] = result;
                res.send(arr);
              })
            })
          })
        })
      })
    })
  })
});

//获取banner列表
router.get("/banner",(req,res)=>{
  var sql = "SELECT bid,pic_url,url,title,subtitle,btn_text FROM index_banner_list ORDER BY bid ASC";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
});

//获取首页手机列表
router.get("/product",(req,res)=>{
  var sql = "SELECT lid,title,subtitle,price,url,pic_url,font_color,family,p_color,tag_txt FROM `index_list` ORDER BY lid ASC";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    var arr = [];
    for(var i=0,j=0; i<result.length;i++){
      result[i].family==j+1 || j++;
      if(!arr[j]){  arr[j]=[] };
      arr[j] = arr[j].concat(result[i]);
    }
    console.log(arr);
    res.send(arr);
  })
})

module.exports = router;