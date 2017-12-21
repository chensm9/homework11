window.onload = function () {
  var search = window.location.href.match(/username=.*/);
  $.ajax({
    url: "/details",
    method: "POST",
    data: {
      username: search[0].substr(9)
    },
    success: function(data) {
      var user = JSON.parse(data);
      $("#username").text(user.username);
      $("#id").text(user.sid);
      $("#phone").text(user.phone);
      $("#mail").text(user.mail);
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