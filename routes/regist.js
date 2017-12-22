var express = require('express');
var router = express.Router();
var path = require('path'),
    fs = require('fs'),
    querystring = require("querystring"),
    mime = require("mime");
var db = require('../database/db'),
    encrypt = require('../database/encrypt');

router.get('/', function(req, res) {
  file = './views/regist.html'
  res.writeHead(200, {'Content-Type': mime.lookup(path.extname(file))});
  var rs = fs.createReadStream(file);
  rs.pipe(res);
});

router.post('/', function(req, res) {
  var user = {
    username: req.body.username ,
    sid: req.body.sid ,
    phone: req.body.phone,
    mail: req.body.mail,
    passwd: encrypt.md5(req.body.passwd)
  };

  ifUnique(user, function(message) {
    if (message == "注册成功") {
      var userInsert = new db.users(user);
      userInsert.save(function(err, res) {
        if(err) {
          console.log("插入数据失败， error: " + err);
        }
        else {
          console.log('成功插入数据: \n' + res);
        }
      });
      res.cookie("user", {username: req.body.username},
                 {maxAge: 1800000 , httpOnly: false});
    }
    res.end(message);
  });
});

function ifUnique (user, callback) {
  db.users.find({'username': user.username})
    .then(data =>  {
      if (data != "") {
        callback("该用户名已经存在");
      } else { 
        return db.users.find({'sid': user.sid});
      }
  }).then(data => {
      if (data != "") {
        callback("该学号已经存在");
      } else {
        return db.users.find({'phone': user.phone});
      }
  }).then(data => {
      if (data != "") {
        callback("该电话号码已经存在");
      } else {
        return db.users.find({'mail': user.mail});
      }
  }).then(data => {
      if (data != "") {
        callback("该邮箱已经存在");
      } else {
        callback("注册成功");
      }
  });
}



module.exports = router;
