var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

var DB_URL = 'mongodb://localhost:27017/library';

/* 链接 */
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

/* 链接成功 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose 数据库连接: ' + DB_URL);
});

// 链接异常
mongoose.connection.on('error', function (err) {
  console.log('Mongoose 数据库连接失败:' + err);
});

// 链接断开

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose 数据库断开连接');
});

module.exports = mongoose;