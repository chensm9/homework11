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
  db.users.find(user).then(data =>  {
    if (data == "") {
      return res.redirect("/");
    } else { 
      res.end(JSON.stringify(data[0]));
    }
  });
});

module.exports = router;