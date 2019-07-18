#设置客户端向服务器端的传输编码
SET NAMES UTF8;
#丢弃数据库oppo如果存在
DROP DATABASE IF EXISTS oppo;
#创建数据库cloudbrain，并设置数据库的存储编码
CREATE DATABASE oppo CHARSET=UTF8;
#进入数据库
USE oppo;
#表index_list-首页列表
CREATE TABLE index_list(
  lid SMALLINT PRIMARY KEY AUTO_INCREMENT,#商品编号
  title VARCHAR(32) NOT NULL,  #商品标题
  subtitle VARCHAR(64), #商品副标题
  price VARCHAR(10) NOT NULL, #价格
  url VARCHAR(80) NOT NULL, #商品链接
  pic_url VARCHAR(80) NOT NULL, #图片地址
  font_color VARCHAR(10) NOT NULL, #字体颜色
  family INT #手机类别
);