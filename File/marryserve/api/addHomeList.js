var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addHomeList(req, res) {
    //打印请求报文
    console.log('增加首页图片xxxxreq' + JSON.stringify(req.body));
    var param = req.body;
    var createTime = param.createTime;
    var id = param.id;
    var imgUrl = param.imgUrl;
    var title = param.title;
    var updateTime = param.updateTime;
    var userId = param.userId;
    var response = new Response(false, '', -1,null);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (imgUrl) {
        //1、查看数据库中是否有相同用户名
        connection.query("INSERT INTO homelist (createTime, id, imgUrl,title,updateTime,userId) VALUES(?,?,?,?,?,?)", [createTime, id, imgUrl,title,updateTime,userId], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '增加首页图片成功', 200,null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '增加首页图片成功', 200,null);
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

module.exports = addHomeList;