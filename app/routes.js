const path = require('path');
// 创建Redis客户端
const { redisClient } = require("../config/redis");

module.exports = function (app) {
    // 处理GET请求
    app.get('/doodles', function(req, res) {
        // 先取浏览器请求，后取cookies
        const username = req.query.username;
        if (typeof username === 'undefined') {
            username = req.cookie.user;
        }

        if (typeof username === 'undefined') {
            // 从Redis中获取网页
            redisClient.get('doodles.html', function(err, reply) {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else if (reply === null) {
                    res.sendFile(path.join(__dirname, "../public/doodles.html"));
                } else {
                    res.send(reply);
                }
            });
        } else {
            // 从Redis中获取网页
            redisClient.hget('doodles', username, function(err, reply) {
                res.cookie('username', username, { maxAge: 315360000000 });//设置cookies
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else if (reply === null) {
                    res.sendFile(path.join(__dirname, "../public/doodles.html"));
                } else {
                    res.send(reply);
                }
            });
        }
    });
    
    // 处理POST请求
    app.post('/doodles', function(req, res) {
        const content = req.body;
        const username = req.cookie.user;
        
        if (typeof username === 'undefined') {
            // 将数据存储到Redis中
            redisClient.set('doodles.html', content, function(err, reply) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('OK');
                }
            });
        } else {
            // 将数据存储到Redis中
            redisClient.hset('doodles', username, content, function(err, reply) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('OK');
                }
            });
        }
    });
};