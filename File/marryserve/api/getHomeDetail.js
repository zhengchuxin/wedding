var logger = require('../logConfig');
var connection = require('../sqlConfig');
var Response = require('./response');


function getHomeDetail(req, res) {
    //打印请求报文
    //1、查询数据库中是否有用户名
    var id = req.query.id;
    connection.query("SELECT * FROM homedetail where id like '%"+ id +"%'", [], function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0) {
            var response = new Response(true, '查询成功', 200, results[0].detailArray);
            logger.info(response);
            res.send(response);

        }else{
            var response = new Response(true, '查询成功', 200, results);
            logger.info(response);
            res.send(response);
        }
    });
}

module.exports = getHomeDetail;