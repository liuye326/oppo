//绘制canvas——OPPO字样
var c3 = document.getElementById("c3");
var ctx = c3.getContext("2d");
var img = new Image();
img.src="./img/oppo.jpg";
img.onload = function(){
  ctx.drawImage(img,0,0,120,30);
}

$(".right>ul").click(function(e){
  e.stopPropagation();
  var $this = $(e.target);
  if($this.is(".no1")){
    var $ul=$this.parent().parent();
    if($ul.is(".active")){
      $ul.removeClass("active");
      return;
    }
    $ul.addClass("active");
  }else if($this.is(".no1 img")){
    var $ul = $this.parent().parent().parent();
    if($ul.is(".active")){
      $ul.removeClass("active");
      return;
    }
    $ul.addClass("active");
  }
})
$(document.body).click(function(e){
  var $this = $(e.target);
  if(!$this.is("ul")&&!$this.is("#login")){
    $(".right>ul").removeClass("active");
  }
})
$(".tab>a").click(function(e){
  e.stopPropagation();
  $this = $(e.target);
  //console.log(e.target);
  $this.addClass("active").siblings("a").removeClass("active");
  var i = $this.index(".tab a");
  $($(".change")[i]).addClass("active").siblings(".change").removeClass("active");
})

var check_state = -1;
function check_msg(){
  //获取用户输入的用户名
  var uname = $("#uname")[0].value;
  var upwd = $("#upwd")[0].value;
  $("#uname_span").html("");
  $("#upwd_span").html("");
  //验证手机号和邮箱的正则表达式
  var reg_phone = new RegExp("^1[3-9][0-9]{9}$");
  var reg_email = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-0_-])+(.[a-zA-Z0-9_-])+$");
  //先用正则表达式进行验证，通过确认后请求服务器，看用户名是否存在
  if(!uname.trim()){
    $("#uname_span").html("用户名不能为空").css("color","red");
  }else if(!upwd.trim()){
    $("#upwd_span").html("密码不能为空").css("color","red");
  }else if(reg_phone.test(uname) || reg_email.test(uname)){
    console.log(1);
    $.ajax({
      async : true,
      type : "post",
      url : "/user/login",
      dataType : "json",
      data:{uname,upwd},
      success: function(data) {
        console.log(data);
        if(data.code<0){
          $("#login_span").html("用户名或密码错误").css("color","red");
        }else{
          sessionStorage.setItem("uid",data.uid);
          history.go(-1);
        }
      }
    })
  }else{
    $("#uname_span").html("用户名格式不正确").css("color","red");
  }
}
$(".change>.button").click(function(){
  if(check_state==-1){
    $('.body-shade').show();
    $('.verify1').show();
    $('#mpanel4').slideVerify({
      type : 2,       //类型
      vOffset : 5,    //误差量，根据需求自行调整
      vSpace : 5, //间隔
      imgName : ['3.png'],
      imgSize : {
          width: '100%',
          height: '200px',
      },
      blockSize : {
          width: '40px',
          height: '40px',
      },
      barSize : {
          width : '100%',
          height : '20px',
      },
      ready : function() {
      },
      success : function() {
        //alert('验证成功');
        //验证注册信息
        check_state = 1;
        check_msg();
        //成功后先将验证框隐藏
        setTimeout(function(){
          $('.verify-alert,.mask-layer').hide();
          $('.body-shade').hide();
          $(".verify-alert").html(`
            <p class="verify-title">拖动滑块完成安全验证</p>
            <i class="icon-close"></i>
            <div id="mpanel4" class="mpanel mpanelslide"></div>
            <p class="slidefail">验证失败，请控制拼图块对齐缺口</p>
            <div class="slidesuccess">
                <img src="../img/slidesuccess.png" alt="">
                <p style="color: #22ac38">验证通过</p>
            </div>
          `);
          $('.icon-close').on('click',del); 
        },1500);
        
      },
      error : function() {
          //alert('验证失败！');
      }
    });
  }else{
    check_msg();
  }
  function del(){
    $('.verify-alert,.mask-layer').hide();
    $('.body-shade').hide();
    $(".verify-alert").html(`
      <p class="verify-title">拖动滑块完成安全验证</p>
      <i class="icon-close"></i>
      <div id="mpanel4" class="mpanel mpanelslide"></div>
      <p class="slidefail">验证失败，请控制拼图块对齐缺口</p>
      <div class="slidesuccess">
          <img src="../img/slidesuccess.png" alt="">
          <p style="color: #22ac38">验证通过</p>
      </div>
    `);
    $('.icon-close').on('click',del);
  }
  $('.icon-close').on('click',del);  
})
