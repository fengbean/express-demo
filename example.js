var express = require('express');

var app = express();

// app.use('/public',express.static('./public'));
var mysql = require('mysql');

app.engine('html', require('express-art-template'));

var connection = mysql.createConnection({ //创建mysql实例
    host: '45.32.34.146',
    port: '3306',
    user: 'root',
    password: 'zhimakaimen',
    database: 'test'
});
connection.connect();





app.get('/', function (req, res) {
    // res.render('example-add.html')
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        str = JSON.stringify(result);
        res.render('example-add.html', {
            top: JSON.parse(str)
        })

    });
})

var sql = 'SELECT * FROM testable'; //查询数据库列表
var str = [];
var addSql = 'INSERT INTO testable(id,title,smalltext) VALUES(NULL,?,?)';
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.post('/example-add', urlencodedParser, function (req, res) {
    var addSqlParams = [req.body.first_name, req.body.last_name];
    console.log("first--------------------------",req.body.first_name)
    //增
    if (req.body.first_name != '' && req.body.last_name != '') {
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            else{
                
                req.body.first_name = '' ;
                req.body.last_name = '';
                console.log("--------------------------",req.body.last_name)
            }
        })
    }
    //查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        str = JSON.stringify(result);
        console.log("check-----------------------",str);
        res.render('example-add.html', {
            top: JSON.parse(str)
        })

    });
    

})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})