const path = require('path');
// 创建Redis客户端
const { redisClient } = require("../config/redis");

module.exports = function (app) {
    // 处理POST请求
    app.get('/doodles', function(req, res) {
        // 从Redis中获取网页
        redisClient.get('doodles.html', function(err, reply) {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else if (reply === null) {
                res.sendFile(path.join(__dirname, "../public/doodles.html"));
            } else {
                res.send(Buffer.from(reply, 'base64').toString('utf8'));
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