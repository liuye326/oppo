const express = require('express');
const bodyParser = require('body-parser');
/*引入路由模块*/
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const detailsRouter = require("./routes/details");
const pool = require("./pool.js");

var app = express();
app.listen(4000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use("/index",indexRouter);
app.use("/user",userRouter);
app.use("/details",detailsRouter);

