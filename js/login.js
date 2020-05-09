$(document).ready(function () {
    $(".login").click(function(){
      var name = $("#name").val();
      var password = $("#password").val();
      $.ajax({
          url:config.url + config.port + "/auth/Login/LoginCheck",
          type: 'POST',
          async: false,
          xhrFields:{withCredentials:true},
          data:{username:name,password:password},
          success:function(data){
              if(data.code == 0){
                   location.href = "./index.html";
              }else{
                  alert("登陆失败");
              }
          }
      })
    });
});