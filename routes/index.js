var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 连接数据库库的users数据表.
var db = mongoose.createConnection('localhost', 'multiroom');
db.on('error', function(err) {
  console.error(err);
});
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: String,
  nickname: String,
  password: String,
  status: String
});
var UserModel = db.model('users', UserSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 用户登录
router.post('/login', function(req, res) {
  UserModel.findOne({username: req.body.loginname, password: req.body.loginpwd}, function(err, user) {
    if (!user) {
      console.error(err);
      res.send({status: false, data: '登录失败!'});
    } else {
      res.send({status: true, data: '登录成功!'});
    }
  });
});
// 用户注册
router.post('/reg', function(req, res) {
  UserModel.findOne({username: req.body.registername}, function(err, user) {
    if (user) {
      res.send({status: false, data: '此用户已经存在!'});
    } else {
      var user = new UserModel();
      user.username = req.body.registername;
      user.password = req.body.registerpwd;
      user.save(function(err) {
        if (err) throw err;
        res.send({status: true, data: '注册成功!'});
      });
    }
  });
});

module.exports = router;
