var mysql=require('mysql')

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test',
    port:3305
})

connection.connect();

var sql='SELECT * FROM websites';
connection.query(sql,function(error,result){
    if (error) return error;
    console.log('--------------------------SELECT----------------------------');
    console.log('The solution is: ', result);
})

var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     return;
    }        

   console.log('--------------------------INSERT----------------------------');
   //console.log('INSERT ID:',result.insertId);        
   console.log('INSERT ID:',result);        
   console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();
