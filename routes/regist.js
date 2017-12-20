var express = require('express');
var router = express.Router();
var path = require('path'),
    fs = require('fs'),
    querystring = require("querystring"),
    mime = require("mime");

router.get('/', function(req, res, next) {
  file = './views/regist.html'
  res.writeHead(200, {'Content-Type': mime.lookup(path.extname(file))});
  var rs = fs.createReadStream(file);
  rs.pipe(res);
});

module.exports = router;
