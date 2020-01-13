// 引入express模块
var express = require("express");
var app = express();
var sha1 = require("sha1");


var config = {
    "appID": "wxb0b8a42715fa045f",
    "appsecret": "9d85d0adca362dabc4e3156e9cc960fc",
    "token": "mywechat"
}

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get("/gettoken", (req, res, next) => {

    // 获取微信服务器发送的数据
    var signature = req.query.signature;  // 微信加密签名
    var timestamp = req.query.timestamp; // 时间戳
    var nonce = req.query.nonce;  // 随机数
    var echostr = req.query.echostr;  // 随机字符串
    // token、timestamp、nonce三个参数进行字典序排序
    var arr = [config.token, timestamp, nonce].sort().join('');
    // sha1加密    
    console.log('signaturexxx==' + JSON.stringify(signature));
    var result = sha1(arr);
    console.log('resultxxx==' + JSON.stringify(result));
    if (result === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
})


// 监听80端口
// connection.end();
app.listen(81, function () {    ////监听81端口
    console.log('Server running  main.js  at 81 port');
});