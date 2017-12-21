var express = require('express');
var router = express.Router();
var path = require('path'),
    fs = require('fs'),
    querystring = require("querystring"),
    mime = require("mime");
var db = require('../database/db');

router.get('/', function(req, res, next) {
  var file;
  if (req.url == '/') {
    file = './views/login.html';
  } else if (req.url.match(/\?username=.*/)) {
    file = './views/details.html';
  } else {
    res.redirect('/');
  }
  res.writeHead(200, {'Content-Type': mime.lookup(path.extname(file))});
  var rs = fs.createReadStream(file);
  rs.pipe(res);
});

router.post('/', function(req, res, next) {
  var user = {
    username: req.body.username,
    passwd: req.body.passwd
  };
  db.users.find(user).then(data =>  {
    if (data == "") {
      res.end("错误的用户名或者密码");
    } else { 
      res.end("登录成功");
    }
  });
});

module.exports = router;