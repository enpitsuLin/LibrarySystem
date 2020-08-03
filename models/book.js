const mongoose = require('../db');
/**
 * book_id 图书id
 * book_name 书名
 * author 作者
 * language 语言 (ISO 639-1语言代码)
 * publisher 出版社
 * price 售价
 * class 类别 (中国图书馆分类法)
 * isbn ISBN识别码 (国际标准书号)
 */

const bookSchema = new mongoose.Schema({
    book_id: Number,
    title: String,
    author: [String],
    language: String,
    publisher: String,
    price: Number,
    isbn: String,
    class: String
}, { versionKey: false }, { collection: 'books' })

module.exports = mongoose.model('book', bookSchema);