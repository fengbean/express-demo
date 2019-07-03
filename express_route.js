var express=require('express');
var app=express();

app.get('/',function(req,res){
    res.send("get get")
})

app.post('/',function(req,res){
    res.send("post post")
})

app.get('/list',function(req,res){
    res.send('list page')
})

app.get('/content',function(res,rep){
    res.send('content page')
})

app.get('/ab*cd', function(req, res) {   
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
 })

var server=app.listen(8081,function(){
    console.log(server.address().port,"port")
    console.log("a href访问地址为 http://%s:%s", server.address().address, server.address().port)
})