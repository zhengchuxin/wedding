const express = require('express')
var config = require('./routes/config.json')
var bodyParser = require("body-parser"); // post需要
var formidable = require("formidable")
var path = require("path")
var fs = require("fs")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploadPic'))//这个很重要，必须要这个才能拿到图片链接，而不是进入路由，有兴趣的同学可以删掉试验一下

// 引入之后,后面的appId是在config内的appId名字
const appId = config.appId;
const appScrect = config.appScrect;

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var getOpenId = require('./api/getOpenId'); // 获取openId
var addPraise = require('./api/addPraise'); // 增加点赞
var addComment = require('./api/addComment'); // 增加评论
var getPraiseList = require('./api/getPraiseList'); // 获取点赞列表
var getCommentList = require('./api/getCommentList'); // 获取评论列表
var addAddress = require('./api/addAddress'); // 发布地址信息
var getAddress = require('./api/getAddress'); // 获取地址信息
var addHomeList = require('./api/addHomeList'); // 发布首页图片
var getHomeList = require('./api/getHomeList'); // 获取首页图片
var addHomeDetail = require('./api/addHomeDetail'); // 发布首页详情
var getHomeDetail = require('./api/getHomeDetail'); // 获取首页详情


app.get('/getOpenId', (req, res) => getOpenId(req, res));
app.post('/addPraise', (req, res) => addPraise(req, res));
app.post('/addComment', (req, res) => addComment(req, res));
app.get('/getPraiseList', (req, res) => getPraiseList(req, res));
app.get('/getCommentList', (req, res) => getCommentList(req, res));
app.post('/addAddress', (req, res) => addAddress(req, res));
app.get('/getAddress', (req, res) => getAddress(req, res));
app.post('/addHomeList', (req, res) => addHomeList(req, res));
app.get('/getHomeList', (req, res) => getHomeList(req, res));
app.post('/addHomeDetail', (req, res) => addHomeDetail(req, res));
app.get('/getHomeDetail', (req, res) => getHomeDetail(req, res));


////////////////////////////////////////////////////////////////////

// 和婚礼无关其他代码
var createorder = require('./api/createorder'); // 订单列表
var orderdetail = require('./api/orderdetail'); // 订单详情

app.post('/createorder', (req, res) => createorder(req, res));
app.get('/orderdetail', (req, res) => orderdetail(req, res));


// 获取上传图片
app.post("/upload", (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, './uploadPic');   //文件保存的临时目录为当前项目下的tmp文件夹  
    form.maxFieldsSize = 1 * 1024 * 1024;  //用户头像大小限制为最大1M    
    form.keepExtensions = true;        //使用文件的原扩展名  
    form.parse(req, function (err, fields, file) {
        var filePath = '';
        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
        if (file.tmpFile) {
            filePath = file.tmpFile.path;
        } else {
            for (var key in file) {
                if (file[key].path && filePath === '') {
                    filePath = file[key].path;
                    break;
                }
            }
        }
        //文件移动的目录文件夹，不存在时创建目标文件夹  
        var targetDir = path.join(__dirname, './uploadPic');
        if (!fs.existsSync(targetDir)) {
            fs.mkdir(targetDir);
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        //判断文件类型是否允许上传  
        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
            var err = new Error('此文件类型不允许上传');
            res.json({ code: -1, message: '此文件类型不允许上传' });
        } else {
            //以当前时间戳对上传文件进行重命名  
            var fileName = new Date().getTime() + fileExt;
            var targetFile = path.join(targetDir, fileName);
            //移动文件  
            fs.rename(filePath, targetFile, function (err) {
                if (err) {
                    console.info(err);
                    res.json({ code: -1, message: '操作失败' });
                } else {
                    //上传成功，返回文件的相对路径  
                    var fileUrl = "http://localhost:" + "4000" + '/' + fileName;
                    res.json({ code: 0, fileUrl: fileUrl });
                }
            });
        }
    });
})

// connection.end();
app.listen(4001, function () {    ////监听4001端口
    console.log('Server running  main.js  at 4001 port');
});