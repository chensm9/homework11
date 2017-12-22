var express = require('express');
var router = express.Router();
var path = require('path'),
    fs = require('fs'),
    querystring = require("querystring"),
    mime = require("mime");
var db = require('../database/db');

router.post('/', function(req, res, next) {
  var user = { 
    username: req.body.username 
  };
  var isvalid = true;
  if (req.cookies.user.username != req.body.username) {
    user.username = req.cookies.user.username;
    isvalid = false;
  }
  db.users.find(user).then(data =>  {
    if (data == "") {
      return res.redirect("/");
    } else { 
      var message = "";
      if (!isvalid) {
        message = "只能够访问自己的数据";
      }
      res.end(JSON.stringify({user: data[0], message: message}));
    }
  });
});

module.exports = router;