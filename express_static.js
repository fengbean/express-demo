var express=require("express");
var app=express();

//使用静态资源
app.use("/publicss",express.static('public'));//前面是路径，后面表示引用的文件

app.get('/',function(res,req){
    req.send("use static")
})

var server=app.listen(8081,function(){
    console.log(server.address().port,"port")
    console.log("a href访问地址为 http://%s:%s", server.address().address, server.address().port)
})