var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 连接数据库
var db = mongoose.createConnection('localhost', 'multiroom');
db.on('error', function(err) {
  console.error(err);
});
var Schema = mongoose.Schema;
// 聊天信息表
var ChatSchema = new Schema({
  from: String,
  to: String,
  time: Number,
  msg: String,
  status: String
});

// 获取用户关联表的信息
var ChatinfoSchema = new Schema({
  users: Array,
  mapusers: Array
});
var ChatinfoModel = db.model('chatinfos', ChatinfoSchema);
var chatinfo = {};
ChatinfoModel.findOne({}, function(err, data) {
  if (err) throw err;
  chatinfo = data;
});

router.get('/', function(req, res, next) {
  console.log(req.query.currentname);
  res.render('chat', {"users": chatinfo.users, 'currentname' : req.query.currentname});
});

module.exports = router;
