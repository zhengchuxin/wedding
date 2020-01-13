var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addComment(req, res) {
    //打印请求报文
    console.log('评论xxxxreq' + JSON.stringify(req.body));
    var param = req.body;
    var nickName = param.nickName;
    var avatarUrl = param.avatarUrl;
    var gender = param.gender;
    var content = param.content;
    var time = param.time;
    console.log('xxxx11=====' + nickName);
    var response = new Response(false, '', -1,null);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (nickName) {
        //1、查看数据库中是否有相同用户名
        connection.query("INSERT INTO comment (nickName, avatarUrl, gender,content,time) VALUES(?,?,?,?,?)", [nickName, avatarUrl, gender,content,time], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '评论成功', 200,null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '评论成功', 200,null);
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

module.exports = addComment;