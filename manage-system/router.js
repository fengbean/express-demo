/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

 var fs=require('fs');//所有与文件操作都是通过 fs 核心模块来实现的，包括文件目录的创建、删除、查询以及文件的读取和写入
 var Student=require('./student');

 // Express 提供了一种更好的方式
// 专门用来包装路由的

var express=require('express');
// 1、创建一个路由容器
var router = express.Router();
 
//2.把路由挂载到router路由中

// 列表页面
router.get('/students',function(req,res){
    if (req.query.name){
        Student.findOneByName( req.query.name, function (err, students) {
            if (err) {
                return res.status(500).send('Server error');
            }
            console.log(students.toString())
            if (students.toString().length == 0) {
                res.render('index.html', {
                    count: 0,
                })
            } else {
                res.render('index.html', {
                    students: students
                })
            }
        })
    }
    else {
        Student.find(function (err, students) {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (students.length >= 3) {
                var top = [
                    students[0],
                    students[1],
                    students[2],
                ]
            }
            res.render('index.html', {
                top: top,
                students: students
            })
        })
    }
})
/**
 * 渲染添加学生的页面
 */
router.get('/students/new', function (req, res) {
    res.render('new.html');
});


// 新增
router.post('/students/new',function(req,res){
    Student.add(req.body,function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/students')
    })
})


/*
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    //
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面
 
    Student.findById(req.query.id, function (err, student) {
        if (err) {
            console.log(err)
            return res.status(500).send('Server error.');
        }
        res.render('edit.html', {
            student: student
        })
    })

})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
    // 1. 获取表单数据
    //    req.body
    // 2. 更新
    //    Student.updateById()
    // 3. 发送响应
    var id = req.body.id
    Student.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

/*
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
    // 1. 获取要删除的 id
    // 2. 根据 id 执行删除操作
    // 3. 根据操作结果发送响应数据
    var id = req.query.id
    Student.findByIdAndRemove(id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

module.exports=router;
