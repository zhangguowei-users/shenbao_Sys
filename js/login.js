$(document).ready(function () {
    $(".login").click(function(){
      var name = $("#name").val();
      var password = $("#password").val();
      $.ajax({
          url:config.url + config.port + "/auth/Login/LoginCheck",
          type: 'POST',
          async: false,
          data:{username:name,password:password},
          success:function(data){
              if(data.code == 0){
                var storage=window.localStorage;
                var data ='bearer '+data.data.TokenValue;
                storage['admin'] = JSON.stringify(data);
                console.log(typeof storage['admin'])
                location.href = "./index.html";
              }else{
                   alert("登陆失败");
              }
          }
      })
    });
});