window.onload = function() {
  $('#registbutton').click(function(){
    window.location.href = '/regist';
  })

  $('#loginbutton').click(function() {
    var username = $("#username").val();
    var passwd = $('#passwd').val();

    if (username == "") {
      TIP("请填写用户名");
      return;
    } else if (passwd == "") {
      TIP("请填写密码");
      return;
    } else {
      alert($('#username').val());
      alert($('#passwd').val());
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

var timeout;
function TIP(message) {
  clearTimeout(timeout);
  $("#tip").text(message);
  $('#tip').removeClass("clear");
  timeout = 
    setTimeout('$("#tip").text(""); $("#tip").addClass("clear");',3000);
}