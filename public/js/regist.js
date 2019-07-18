$(function(){
  $.ajax({
    async : true,
    type : "get",
    url : "/user/place",
    dataType : "json",
    success: function(data) {
      var options = "";
      for(var item of data){
        options+=`
        <option value="${item.pid}" title="${item.title}" >${item.pname}</option>  
        `
      }
      $("#s1").html(options);
    }
  })
})
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
$(document).ready(function() {
  $('.fio__upper').on("input propertychange paste focusout",function(){for(var parts=$(this).val().split(" "),i=0;i<parts.length;i++)parts[i]=parts[i].charAt(0).toUpperCase()+parts[i].substring(1).toLowerCase();$(this).val(parts.join(" "))});
  $(".fastbannerform__country").select2({
      templateResult: formatState,
      templateSelection: formatState
  });
});
function formatState(state){
  if(!state.id){return state.text;}
  var stateline = $('<span class="fastbannerform__span f32 NOFLAG ' + state.title + '"></span> <span class="fastbannerform__span">' + state.text + '</span>');
  return stateline;
}
function showNMenu(){
  $('body > header .nheader button.main_nav_menu_icon').addClass('active');
}
function closeNMenu(){
  $('body > header .nheader button.main_nav_menu_icon').removeClass('active');
}
!function(){
  var btn_state = -1;
  var check_state = -1;
  $("#check").change(function(e){
    console.log(!e.target.checked);
    btn_state = e.target.checked ? 1 : -1;
    if(e.target.checked){
      $("#btn").removeClass("disabled")
    }else{
      $("#btn").addClass("disabled")
    }
  })
  function check_msg(){
    var place = $("#s1")[0].value;
    var uname = $("#uname")[0].value;
    var upwd = $("#upwd")[0].value;
    var re_upwd = $("#re_upwd")[0].value;
    var reg_phone = new RegExp("^1[3-9][0-9]{9}$");
    var reg_email = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-0_-])+(.[a-zA-Z0-9_-])+$");
    var reg_upwd = new RegExp("^[0-9a-zA-z_]{6,16}$");
    if(!uname.trim()){
      $("#uname_span").html("用户名不能为空").css("color","red");
    }else if(!reg_phone.test(uname) && !reg_email.test(uname)){
      $("#uname_span").html("用户名格式不正确").css("color","red");
    }else if(!reg_upwd.test(upwd.trim())){
      $("#upwd_span").html("密码格式不正确").css("color","red");
    }else if(!upwd.trim()&&!re_upwd.trim()){
      $("#upwd_span").html("密码不能为空").css("color","red");
    }else if(! upwd.trim() == re_upwd.trim()){
      $("#upwd_span").html("两次密码需保持一致").css("color","red");
    }else{
      $.ajax({
        async : true,
        type : "post",
        url : "/user/regist",
        dataType : "json",
        data:{place,uname,upwd},
        success: function(data) {
          console.log(data);
          location.replace("login.html");
        }
      })
    }
  }
  $("#btn").click(function(){
    if(btn_state==1){
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
    }
  }); 
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
}()