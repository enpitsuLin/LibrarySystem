const express = require('express');
const router = express.Router();


//绑定路由
router.use('/book', require('./book'));
router.use('/user', require('./user'));
router.use('/borrow', require('./borrow'))


module.exports = router;