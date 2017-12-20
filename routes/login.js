var express = require('express');
var router = express.Router();
var path = require('path'),
    fs = require('fs'),
    querystring = require("querystring"),
    mime = require("mime");

router.get('/', function(req, res, next) {
  file = './views/login.html'
  res.writeHead(200, {'Content-Type': mime.lookup(path.extname(file))});
  var rs = fs.createReadStream(file);
  rs.pipe(res);
});

router.post('/', function(req, res, next) {
  res.end("登录失败");
});

module.exports = router;