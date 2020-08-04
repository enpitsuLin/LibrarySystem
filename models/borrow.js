const mongoose = require('../db');
/**
 * user_id 借阅人学生号或工号
 * book_id 图书id
 * borrow_date 借阅时间
 */
const borrowSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    book_id: { type: Number, required: true },
    borrow_date: { type: Date, default: Date.now }
}, { versionKey: false }, { collection: 'borrow' })

module.exports = mongoose.model('borrow', borrowSchema);