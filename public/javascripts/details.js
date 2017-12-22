window.onload = function () {
  var search = window.location.href.match(/username=.*/);
  $.ajax({
    url: "/details",
    method: "POST",
    data: {
      username: search[0].substr(9)
    },
    success: function(data) {
      var data = JSON.parse(data);
      $("#username").text(data.user.username);
      $("#id").text(data.user.sid);
      $("#phone").text(data.user.phone);
      $("#mail").text(data.user.mail);
      if (data.message != "") {
        TIP(data.message);
      }
    }
  });
  $("button").click(function(){
    $.ajax({
      url: "/logout",
      success: function(){
        window.location = '/';
      }
    });
  })
}

function TIP(message) {
  $("#tip").text(message);
  $('#tip').removeClass("clear");
  var timeout = 
    setTimeout('$("#tip").text(""); $("#tip").addClass("clear");',3000);
}