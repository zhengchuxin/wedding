var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');

function addPraise(req, res) {
    //打印请求报文
    console.log('点赞xxxxreq' + JSON.stringify(req.body));
    var param = req.body;
    var nickName = param.nickName;
    var avatarUrl = param.avatarUrl;
    var gender = param.gender;
    var country = param.country;
    var province = param.province;
    var city = param.city;
    var openId = param.openId;
    console.log('xxxx11=====' + nickName);
    var response = new Response(false, '', -1);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (nickName) {

        //1、查看数据库中是否有相同用户名
        connection.query("SELECT * FROM praise where openId like '%"+ openId +"%'", [], function (error, results, fields) {
            if (error) throw error;
            if(results.length > 0) { // 已祝福过了
                if (gender == 1) {
                    response = new Response(false, '你已经祝福过了小老弟', 200, null);
                } else {
                    response = new Response(false, '你已经祝福成功老妹', 200, null);
                }
                res.send(response);
            }else{ // 未祝福
                connection.query("INSERT INTO praise (nickName, avatarUrl, gender,country,province,city,openId) VALUES(?,?,?,?,?,?,?)", [nickName, avatarUrl, gender, country, province, city, openId], function (error, results, fields) {
                    if (error) throw error;
                    //3、如果没有相同用户名，并且有一条记录，则注册成功
                    if (results.affectedRows == 1) {
                        if (gender == 1) {
                            response = new Response(false, '祝福成功小老弟,谢谢', 200, null);
                        } else {
                            response = new Response(false, '祝福成功小老妹，谢谢', 200, null);
                        }
                        res.send(response);
                    } else {
                        if (gender == 1) {
                            response = new Response(false, '祝福成功小老弟,谢谢', 200, null);
                        } else {
                            response = new Response(false, '祝福成功小老妹，谢谢', 200, null);
                        }
                        res.send(response);
                    }
                });
            }
        });
    } else {
        response = new Response(false, '有参数为空', -1);
        logger.info(response);
        res.send(response);
    }
}

module.exports = addPraise;