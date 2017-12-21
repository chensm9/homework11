var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/usersdb");

db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
  console.log("------数据库连接成功！------");
});

var userSchema = new mongoose.Schema({
  username : { type:String },
  sid : { type:String },
  phone : { type:String },
  mail : { type:String },
  passwd : { type:String },
});

exports.users = db.model('users', userSchema);