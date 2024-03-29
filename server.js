const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

const { PORT } = require("./config/config");

// 创建Express实例
const app = express();
// 打印请求日志
app.use(morgan('dev'));
// 解析请求体中的TEXT数据
app.use(bodyParser.text({ limit: '20mb' }));
// app.use(bodyParser.json({ limit: '20mb' }));

// 解析请求中的cookies
app.use(cookieParser());
// routes
require('./app/routes.js')(app);

// 启动服务器
app.listen(+PORT, "127.0.0.1", function() {
  console.log(`Server is listening on 127.0.0.1:${PORT}`);
});
