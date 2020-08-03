/*  app.js */
const express = require('express')
const book = require('./router/book')
const bodyParser = require("body-parser");

const app = express()

// 使用 body-parser 中间
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', book)

//定义服务启动端口
app.listen(3000, () => {
  console.log('服务器已启动。')
})