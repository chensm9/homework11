window.onload = function() {

  $('button').click(function() {
    var username = $("#username").val();
    var passwd = $('passwd').val();

    if (username == "") {
      TIP("请填写用户名");
      return;
    }
    else if (passwd == "") {
      TIP("请填写用户名");
      return;
    }

    if (validUsername(username) && validID(passwd)) {
      $.ajax({
        url: "/",
        method: "POST",
        data: {
          username: $('#username').val(),
          passwd: $('#passwd').val(),
        },
        success: function(data, textStatus, jqXHR) { 
          if (data == "登录成功") {
            window.location.href = "?username="+$("#username").val();
          }
          else {
            TIP(data);
          }
        }
      });
    }
  });
}

function validUsername(username) {
  if (username.length < 6 || username.length > 18) {
    TIP("用户名由6~18位英文字母、数字或下划线组成");
    return false;
  } else if (!/[a-z|A-Z]/.test(username[0])) {
    TIP("用户名以英文字母开头");
    return false;
  } else {
    for (var i = 1; i < username.length; i++) {
      if (!/[a-z|A-Z|_|0-9]/.test(username[i])) {
        TIP("用户名只由英文字母、数字或下划线组成");
        return false;
      }
    }
  }
  return true;
}

function validPasswd(passwd) {
  if (username.length < 6 || username.length > 18) {
    TIP("用户名由6~18位英文字母、数字或下划线组成");
    return false;
  } else if (!/[a-z|A-Z]/.test(username[0])) {
    TIP("用户名以英文字母开头");
    return false;
  } else {
    for (var i = 1; i < username.length; i++) {
      if (!/[a-z|A-Z|_|0-9]/.test(username[i])) {
        TIP("用户名只由英文字母、数字或下划线组成");
        return false;
      }
    }
  }
  return true;
}

var timeout;
function TIP(message) {
  clearTimeout(timeout);
  $("#tip").text(message);
  $('#tip').removeClass("clear");
  timeout = 
    setTimeout('$("#tip").text(""); $("#tip").addClass("clear");',3000);
}