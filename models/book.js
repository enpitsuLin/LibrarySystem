const mongoose = require('../db');
/**
 * book_id 图书id
 * book_name 书名
 * author 作者
 * publish 出版社,
 * price 售价
 * class 类别
 */

const bookSchema = new mongoose.Schema({
    book_id: Number,
    book_name: String,
    author: String,
    publish: String,
    price: Number,
    class: String
}, { collection: 'books' })

module.exports = mongoose.model('book',bookSchema);