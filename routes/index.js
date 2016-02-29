var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 连接数据库库的users数据表.
var db = mongoose.createConnection('localhost', 'multiroom');
db.on('error', function(err) {
  console.error(err);
});
var Schema = mongoose.Schema;
// 用户表
var UserSchema = new Schema({
  username: String,
  nickname: String,
  password: String,
  status: String
});
var UserModel = db.model('users', UserSchema);
// 用户关联表
var ChatinfoSchema = new Schema({
  users: Array,
  mapusers: Array
});
var ChatinfoModel = db.model('chatinfos', ChatinfoSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 用户登录
router.post('/login', function(req, res) {
  UserModel.findOne({username: req.body.loginname, password: req.body.loginpwd}, function(err, user) {
    if (!user) {
      console.error(err);
      res.send({status: false, data: '登录失败!', loginname: req.body.loginname});
    } else {
      res.send({status: true, data: '登录成功!', loginname: req.body.loginname});
    }
  });
});
// 用户注册
router.post('/reg', function(req, res) {
  var registername = req.body.registername;
  var registerpwd = req.body.registerpwd;
  UserModel.findOne({username: registername}, function(err, user) {
    if (user) {
      res.send({status: false, data: '此用户已经存在!'});
    } else {
      var user = new UserModel();
      user.username = registername;
      user.password = registerpwd;
      user.save(function(err) {
        if (err) throw err;
        updateChatinfo(registername);
        res.send({status: true, data: '注册成功!', registername: registername});
      });
    }
  });
});

// 更新chatinfo信息
function updateChatinfo(username) {
  ChatinfoModel.findOne({}, function(err, data) {
    if (err) {
      console.error(err);
      return;
    }

    var users = [username],
        mapusers = [];
    if (data && data.users) users = data.users;
    if (data && data.mapusers) mapusers = data.mapusers;

    if (data && data.users) {
      for (var oneuser of users) {
        mapusers.push(oneuser + '_' + username);
      }
      users.push(username);
    }

    ChatinfoModel.remove({}, function(err, data) {
      if (err) throw err;
      var chatinfo = new ChatinfoModel();
      chatinfo.users = users;
      chatinfo.mapusers = mapusers;
      chatinfo.save(function(err) {
        if (err) throw err;
      });
    });
  });
}

module.exports = router;
