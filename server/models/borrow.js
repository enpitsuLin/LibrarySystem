const mongoose = require('../db');
/**
 * user_id 借阅人学生号或工号
 * book_id 图书id
 * borrow_date 借阅时间
 */
const borrowSchema = mongoose.Schema({
    user_id: Number,
    book_id: Number,
    borrow_date: Date
}, { collection: 'borrow' })

module.exports = mongoose.model('borrow',borrowSchema);