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
function behave(){
    $(".pic-sm img").click(function(e){
        var $this = $(e.target);
        $this.parent().addClass("active").siblings().removeClass("active");
        $(".pic-lg img").attr("src",$this.attr("data-lg"));
    })
    $(".color_ones").click(function(e){
        var $this = $(e.target);
        if($this.is("a")){
            $this.addClass("active").parent().siblings().children().removeClass("active");
            if($this.is(".color a")||$this.is(".config a")){
                var con_id = $(".config .active").attr("data-con");
                var col_id = $(".color .active").attr("data-col");
                window.open(`?col_id=${col_id}&con_id=${con_id}`,"_self")
            }
        }else if($this.is("SPAN")){
            $this.parent().addClass("active").parent().siblings().children().removeClass("active");
            if($this.is(".color span")||$this.is(".config span")){
                var con_id = $(".config .active").attr("data-con");
                var col_id = $(".color .active").attr("data-col");
                window.open(`?col_id=${col_id}&con_id=${con_id}`,"_self")
            }
        }

    })
    !function(){
        var ml = 0;
        var liWidth = 8;
        var li_count = $(".prefer_price_ul").children().length;
        $(".prefer_price_ul").css("width",li_count*liWidth+"rem");
        $("#btn_left").click(function(){
            $("#btn_right").removeClass("disabled");
            if(ml>0){
                ml--;
                $(".prefer_price_ul").css("margin-left",-ml*liWidth + "rem");
                if(ml==0){ 
                    $("#btn_left").addClass("disabled");
                }
            }
        })
        $("#btn_right").click(function(){
            if(li_count-ml >4){
                $("#btn_left").removeClass("disabled");
                ml++;
                $(".prefer_price_ul").css("margin-left",-ml*liWidth + "rem");
                if(li_count-ml <=4){ 
                    $("#btn_right").addClass("disabled");
                }
            }
        })
    }()
    !function(){
        var cut_state = -1;
        $(".count>div").click(function(e){
            var $this = $(e.target);
            var count;
            if($this.is("#cut")){
                if(cut_state == 1){
                    var inner = $this.next()[0];
                    if(inner.value==""){
                        count = 1;
                    }else{
                        count = inner.value;
                        count--;
                    }
                    if(count<=0){
                        $this.addClass("disabled");
                        cut_state = -1;
                    }
                    inner.value = count;
                    $(".sc_count").html(`x${count}`)
                }
            }else if($this.is("#plus")){
                var inner = $this.prev()[0];
                cut_state = 1;
                $this.siblings().removeClass("disabled");
                if(inner.value==""){
                    count = 1;
                }else{
                    count = inner.value;
                    count++;
                }
                inner.value = count;
                $(".sc_count").html(`x${count}`)
            }
        })
    }()
    $(window).scroll(function(){
        var a = $(window).scrollTop();
        var $div = $("#vary_height");
        if(a<=180){
            $div.css("height",0);
        }else if(a<=330){
            $div.css("height",80);
        }else if(a<=580){
            $div.css("height",330);
        }else if(a<=780){
            $div.css("height",530);
        }else if(a<=980){
            $div.css("height",700);
        }
        if(a>1600){
            $(".shortcut").addClass("active");
        }else{
            $(".shortcut").removeClass("active");
        }
    })
    $(".prefer_price_ul").click(function(e){
        var $this = $(e.target);
        if($this.is("input")){
            var num = $(".prefer_price_ul input:checked").length;
            if(num>0){
                $(".prefer_price_p>div").addClass("active");
                $(".prefer_price_p>div>span").html(`省 ¥${(num*10).toFixed(1)}`)
            }else{
                $(".prefer_price_p>div").removeClass("active");
            }
        }
    })
    $(".btn_cart").click(function(){
        pCount = parseInt($(".count input")[0].value);
        console.log(pid,pCount);
        if(!sessionStorage.uid){
            window.open(`login.html`,"_self");
        }else{
            window.open(`cart.html?pid=${pid}&pCount=${pCount}`,"_self");
            localStorage.setItem(pid,pCount);
        }
    })
}
var query_arr = location.search.split(/[&=]/ig);
var col_id=query_arr[1];
var con_id=query_arr[3];
var pid;
var pCount;
$.ajax({
    async : true,
    type : "get",
    url : "/details/getlist",
    dataType : "json",
    data:{col_id,con_id},
    success: function(data) {
        var list = data[0];
        var pics = data[1];
        var cols = data[2];
        var cons = data[3];
        var pres = data[4];
        pid = list.pid;
        console.log(pid);
        $(".pic-lg").html(`
            <img src="${pics.pic_l_1}" alt="">
        `);
        $(".pic-sm").html(`
            <li class="active"><img src="${pics.pic_s_1}" data-lg="${pics.pic_l_1}"></li>
            <li><img src="${pics.pic_s_2}" data-lg="${pics.pic_l_2}"></li>
            <li><img src="${pics.pic_s_3}" data-lg="${pics.pic_l_3}"></li>
            <li><img src="${pics.pic_s_4}" data-lg="${pics.pic_l_4}"></li>
        `);
        var col_html = "";
        for(var item of cols){
            col_html += `
                <li><a href="javascript:;" data-col="${item.cid}">
                    <span class="color_point" style="background:${item.color}"></span>
                    <span>${item.color_name}</span>
                </a></li>
            `;
        } 
        $("#colors").html(col_html);
        var con_html = "";
        for(var item of cons){
            con_html += `
                <li><a href="javascript:;" data-con="${item.pid}">${item.config}</a></li>
            `;
        }
        var pre_html = "";
        for(var i=1;i<pres.length;i++){
            pre_html += `
            <li>
                <div>
                    <img src="./img/${pres[i].pic_url}" alt="">
                </div>
                <p>${pres[i].title}</p>
                <div>
                    <input type="checkbox">
                    <p>¥${pres[i].price-10} <span>¥${pres[i].price}</span></p>
                </div>
            </li>
            `;
        }
        $(".prefer_price_ul").html(pre_html);
        $("#configs").html(con_html);
        $(".title").html(list.p_title);
        $(".sc_price_content").html(list.price);
        $(".price_content").html(list.price);
        $(".st_1").html(`¥${(list.price/3).toFixed(2)} x 3期`);
        $(".st_2").html(`¥${(list.price/6+10.49).toFixed(2)} x 6期`);
        $(".st_3").html(`¥${(list.price/12+8.74).toFixed(2)} x 12期`);
        $(`#colors>li:nth-child(${list.color_id})>a`).addClass("active");
        $(`#configs>li:nth-child(${list.config_id})>a`).addClass("active");
        behave();
    }
})
