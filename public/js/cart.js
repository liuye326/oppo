$.ajax({
  url:"header.html",
  type:"get"
}).then(function(result){
  $(result).replaceAll($("header"));
  $(function(){
      $("#nav_right img").attr("src","img/shopping_b.png")
      $(".navigator>ul>li:lt(5)").mouseover(function () {
          $(".navigator").css("background", "#fff");
          $(".navigator a").css("color", "#000");
          $(".navigator>.dropdown").css("height", "180px");
      });
      $(".navigator").mouseleave(function () {
          $(".navigator>.dropdown").css("height", "0px");
          setTimeout(function () {
              $(".navigator").css("background", "transparent");
              $("#nav_right img").attr("src","img/shopping_b.png")
          }, 500);
      })
      $("#on-off").click(function(){
          $("ul.ul_md").slideToggle();
      });
  })
})
function actions(){
  $(".tab_notnone ul").click(function(e){
    var $this = $(e.target);
    if($this.is(".ischoose")){
      if($this.attr("data-selected")==0){
        $this.attr("data-selected","1").attr("src","./img/choose.png");
      }else{
        $this.attr("data-selected","0").attr("src","./img/unchoose.png");
      }
    }else if($this.is("#cut")){
      if($this.attr("data-state")!=""){
        var inner = $this.next()[0];
        count = inner.value;
        count--;
        if(parseInt(count) <=0 ){
          $this.addClass("disabled").attr("data-state","0");
          inner.value = 0;
          localStorage.setItem($this.parent().attr("data-pid"),0);
        }else{
          inner.value = count;
          localStorage.setItem($this.parent().attr("data-pid"),count);
        }
      }
    }else if($this.is("#plus")){
      $this.siblings("img").attr("data-state","1").removeClass("disabled");
      var inner = $this.prev()[0];
      count = inner.value;
      if(count==""){
        count = 0;
      }
      count++;
      localStorage.setItem($this.parent().attr("data-pid"),count);
      inner.value = count;
    }else if($this.is(".todel")){
      localStorage.removeItem($this.attr("data-pid"));
      $this.parent().parent().remove();
      if($(".cart_list>li").length==0){
        $(".tab_none").addClass("active").siblings().removeClass("active");
      }
    }
  
    //ul区域被点击时重新计算最后的总和
    var choosed = $(".cart_list>li>div>img[data-selected='1']");
      //console.log(choosed);
    var price = 0;
    for(var elem of choosed){
      var p_one = parseInt($(elem).parent().siblings(".p_price").html().substr(1));
      var sum = parseInt($(elem).parent().siblings(".count").children("input")[0].value);
      price += p_one*sum;
    }
    if(price==0){
      $(".account_right>a").addClass("disabled").prev().children("span").html(`￥ 0`);;
    }else{
      $(".account_right>a").removeClass("disabled").prev().children("span").html(`¥ ${price.toFixed(2)}`);
    }
  })
}
var local_data = localStorage;
if(local_data.length<=0){
  $(".tab_none").addClass("active");
}else{
  $(".tab_notnone").addClass("active");
  var pids = [];
  for(var item in local_data){
    pids.push(item);
  }
  pids = pids.toString().slice(0,local_data.length*2-1);
  $.ajax({
    async : true,
    type : "get",
    url : "/details/getcart",
    dataType : "json",
    data:{pids},
    success: function(data) {
      console.log(data);
      var cart_html = "";
      for(var item of data){
        cart_html+=`
          <li>
            <div>
              <img class="ischoose" src="./img/unchoose.png" data-selected="0" alt="">
            </div>
            <img src="${item.pic_pre}" alt="">
            <a class="p_title" href="javascript:;">${item.p_title}</a>
            <span class="p_price">￥${item.price}</span>
            <div class="count" data-pid="${item.pid}">
              <img id="cut" class="disabled" data-state="0" src="./img/jian.png">
              <input type="text" value="${local_data[item.pid]}">
              <img id="plus" src="./img/jia.png" alt="">
            </div>
            <div>
              <img class="todel" src="./img/del.png" data-pid="${item.pid}" alt="">
            </div>
          </li>
        `
      }
      $(".cart_list").html(cart_html);
    }
  })
  actions();
}
