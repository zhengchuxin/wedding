var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addAddress(req, res) {
    //打印请求报文
    console.log('发布xxxxreq' + JSON.stringify(req.body));
    var param = req.body;
    var openId = param.openId;
    var timeString = param.timeString;
    var remark1 = param.remark1;
    var remark2 = param.remark2;
    var name = param.name;
    var invate = param.invate;
    var time = param.time;
    var address = param.address;
    var lag = param.lag;
    var lat = param.lat;
    var backgroundPic = param.backgroundPic;
    
    console.log('发布的openId=====' + openId);
    var response = new Response(false, '', -1);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (openId) {
        //1、查看数据库中是否有相同用户名
        connection.query("INSERT INTO address (openId,timeString,remark1,remark2,name,invate,time,address,lag,lat,backgroundPic) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [openId,timeString,remark1,remark2,name,invate,time,address,lag,lat,backgroundPic], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '发布地址信息成功', 200,null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '发布地址信息成功', 200,null);
                logger.info(response);
                res.send(response);
            }
        });
    } else {
        response = new Response(false, '有参数为空', -1);
        logger.info(response);
        res.send(response);
    }
}

module.exports = addAddress;