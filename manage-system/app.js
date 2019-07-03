/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

var express=require('express');
var router=require('./router');
var bodyparser=require('body-parser');

var app=express();

//app.use()在指定路径上挂载指定的或多个中间件函数:当请求的路径的基础与路径匹配时，将执行中间件函数。
//app.static()提供静态文件，并基于静态服务

app.use('/node_modules',express.static('./node_modules'));
app.use('/public',express.static('./public'));

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.engine('html',require('express-art-template'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//挂载路由到APP服务中
app.use(router);

//监听端口
app.listen(8081,function(){
    console.log("正在监听http")
})