const mongoose = require('../db');
/** 
 * user_id: 学生证号或者工号
 * username 用户名
 * password 密码
 * identity 身份 0-管理员 1-学生 2-老师
 * name 姓名
 * department 学院
 */
const userSchema = mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  identity: { type: Number, default: 1 },
  name: { type: String, required: true },
  department: { type: String }
}, { versionKey: false }, { collection: 'users' })

module.exports = mongoose.model('user', userSchema);