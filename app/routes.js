// 创建Redis客户端
const redisClient = require("../config/redis");

module.exports = function (app) {
    // 处理POST请求
    app.get('/doodles', function(req, res) {
        // 从Redis中获取网页
        redisClient.get('doodles.html', function(err, reply) {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else if (reply === null) {
            res.sendFile("../public/doodles.html");
        } else {
            res.send(reply);
        }
        });
    });
    app.post('/doodles', function(req, res) {
        const content = req.body.content;
    
        // 将数据存储到Redis中
        redisClient.set('doodles.html', content, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('OK');
        }
        });
    });
};