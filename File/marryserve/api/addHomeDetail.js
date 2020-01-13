var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addHomeDetail(req, res) {
    //打印请求报文
    console.log('增加首页详情xxxxreq' + JSON.stringify(req.body));
    var param = req.body;
    var id = param.id;
    var detailArray = JSON.stringify(param.detailArray);
    var response = new Response(false, '', -1,null);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (id) {
        //1、查看数据库中是否有相同用户名
        connection.query("INSERT INTO homedetail (id, detailArray) VALUES(?,?)", [id, detailArray], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '增加首页详情图片成功', 200,null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '增加首页详情图片成功', 200,null);
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

module.exports = addHomeDetail;