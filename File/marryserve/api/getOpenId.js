var config = require('../routes/config.json')
const request = require('request')
const querystring = require('querystring');
var Response = require('./response');

// 引入之后,后面的appId是在config内的appId名字
const appId = config.appId;
const appScrect = config.appScrect;

function getOpenId(req, res) {
    //打印请求报文
    console.log('获取的code:' + req.query.code);
    //将请求地址的url后面的参数拼接起来
    var data = {
        'appid': appId,
        'secret': appScrect,
        'js_code': req.query.code,
        'grant_type': 'authorization_code'
    };
    var content = querystring.stringify(data);
    // 根据微信开发者文档给的API
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
    // 对url发出一个get请求
    request.get({
        'url': url
    }, (error, response, body) => {
        // 将body的内容解析出来
        let abody = JSON.parse(body);
        // body里面包括openid和session_key
        console.log(abody)
        var response = new Response(true, '查询成功', 200, abody); // 审核中
        // var response = new Response(true, '查询openId成功', 200, abody); // 发布后
        res.send(response);
        // // 将请求的内容返回给前端
        // res.json(abody)
    })
}

module.exports = getOpenId;