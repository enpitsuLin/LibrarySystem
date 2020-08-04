const mongoose = require('../db');
/**
 * user_id 借阅人学生号或工号
 * book_id 图书id
 * history_date 借阅时间
 */
const historySchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    book_id: { type: Number, required: true },
    borrow_date: { type: Date, required: true },
    return_date: { type: Date, required: true, default: Date.now }
}, { versionKey: false }, { collection: 'history' })

module.exports = mongoose.model('history', historySchema);