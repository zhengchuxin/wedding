var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');
var UUID = require('uuid');

function createorder(req, res) {
    //打印请求报文
    console.log('订单xxxxreq' + JSON.stringify(req.body));

    var param = req.body;
    let ordernum = '2020' + UUID.v1(); // 生成订单的id
    var status = '0';
    var userid = param.userid;
    var name = param.name;
    var tel = param.tel;
    var address = param.address;
    var notecomment = param.note;

    // 1、获取前端提交的订单数据 "[{},{},{}]" -- 转成对象
    let lists = JSON.parse(param.list);
    let arr = [] // 订单列表数据
    lists.map(item => { // 遍历数据，获取订单的信息
        arr.push({
            proid: item.proid,
            proimg: item.proimg,
            proname: item.proname,
            price: item.price,
            num: item.num
        })
    })
    arr = JSON.stringify(lists);

    var response = new Response(false, '', -1, null);
    // if (productName && productPrice && productType && productImg && productDes) {
    if (userid) {
        //1、查看数据库中是否有相同用户名
        connection.query("INSERT INTO createorder (ordernum, status, userid, name, tel, address, notecomment,listarray) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [ordernum, status, userid, name, tel, address, notecomment,arr], function (error, results, fields) {
            if (error) throw error;
            //3、如果没有相同用户名，并且有一条记录，则注册成功
            if (results.affectedRows == 1) {
                response = new Response(false, '创建订单成功', 200, null);
                logger.info(response);
                res.send(response);
            } else {
                response = new Response(false, '创建订单成功', 200, null);
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

module.exports = createorder;