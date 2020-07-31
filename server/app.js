/*  app.js */
const express = require('express')
const app = express()
const book = require('./router/book')

//定义简单路由
/* app.use('/', (req, res) => {
  res.send('Yo!')
}) */
app.use('/api', book)

//定义服务启动端口
app.listen(3000, () => {
  console.log('app listening on port 3000.')
})