var express=require("express");
var app=express();

app.use('/public',express.static('public'));

app.locals.title = 'My App';
app.get('/',function(req,res){
    res.send(app.locals.title)
})

app.get('/index.html',function(req,res){
    res.sendFile( __dirname + "/" + "index.html") //__dirname 总是指向被执行 js 文件的绝对路径
})

app.get('/process_get',function(req,res){
    var response={
        'first_name':req.query.first_name,
        'last_name':req.query.last_name,
    }
    console.log(response);
   res.end(JSON.stringify(response));
})

var bodyParser=require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post',urlencodedParser,function(req,res){
    var response={
        'first_name':req.query.first_name,
        'last_name':req.query.last_name
    }
    res.end(JSON.stringify(response));
})

var fs=require("fs");//s模块用于对系统文件及目录进行读写操作。
var multer=require('multer');//multer用于处理文件上传的nodejs中间件
app.use(multer({ dest: '/tmp/'}).array('image'));
app.post('/file_upload',urlencodedParser,function(req,res){
    console.log("file",req.files[0]);//上传的文件
    var des_file=__dirname+'/'+req.files[0].originalname;
    fs.readFile(req.files[0].path,function(err,data){
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                 console.log( err );
            }else{
                  response = {
                      message:'File uploaded successfully', 
                      filename:req.files[0].originalname
                 };
             }
             console.log( response );
             res.end( JSON.stringify( response ) );
          });
    })
})

var cookieParser=require('cookie-parser');//通过设置响应头来设置cookie，通过req.headers.cookie来获取cookie
var util=require('util');//node的util模块提供了一系列常用工具 主要用于输出信息和数据验证
app.use(cookieParser());
app.get('/cookie',function(req,res){
    console.log('cookie',util.inspect(req.cookies));
})



var server = app.listen(8081, function () {                           
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
})