var log4js = require('log4js');

//配置日志项
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log',
            coloured: 'red'
        }
    },
    categories: {
        default: {
            appenders: [
                'cheese'
            ],
            level: 'error'
        }
    }
});
var logger = log4js.getLogger('cheese');

module.exports = logger;