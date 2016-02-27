var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 用户登录
router.post('/login', function(req, res) {
  console.log('login:', req.body);
});
// 用户注册
router.post('/reg', function(req, res) {
  console.log('reg:', req.body);
});

module.exports = router;
