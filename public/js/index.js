$(function(){
    //元素上浮效果
    function elem_up(){
        // 获取浏览器可见区域高度
        var window_height= document.documentElement.clientHeight;
        // 用户手动修改浏览器可见区域高度时修改变量
        window.addEventListener("resize",function () {
            window_height=document.documentElement.clientHeight;
        });
        // 获取所需效果元素
        var My_dream=document.getElementsByClassName('dream');
        // 鼠标滚轮滚动执行方法
        window.onscroll = function(){
            // 获取鼠标滚轮滚动距离
            var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 循环类dream
            for (var k=0;k<My_dream.length;k++){
                if (_scrollTop>= getOffsetTop(My_dream[k]) - window_height && _scrollTop<= getOffsetTop(My_dream[k]) ){
                    My_dream[k].style.animationName=My_dream[k].dataset.animate.split(',')[0];
                    My_dream[k].style.animationDuration=My_dream[k].dataset.animate.split(',')[1];
                    My_dream[k].style.animationTimingFunction=My_dream[k].dataset.animate.split(',')[2];
                }
            }
        };
        // 判断元素父集是否有已定位元素
        function getOffsetTop(ele) {
            var rtn = ele.offsetTop;
            var o = ele.offsetParent;
            while(o!=null)
            {
                rtn += o.offsetTop;
                o = o.offsetParent;
            }
            return rtn;
        }
        // 滚动条等于0时执行第一屏效果
        function my_animation() {
            var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 效果方法
            for (var k=0;k<My_dream.length;k++){
                if (_scrollTop>= getOffsetTop(My_dream[k]) - window_height && _scrollTop<= getOffsetTop(My_dream[k]) ){
                    My_dream[k].style.animationName=My_dream[k].dataset.animate.split(',')[0];
                    My_dream[k].style.animationDuration=My_dream[k].dataset.animate.split(',')[1];
                    My_dream[k].style.animationTimingFunction=My_dream[k].dataset.animate.split(',')[2];
                }
            }
        }
        my_animation();
        //写入颜色选项中的颜色
        $(".goods_b ul>li:first-child").addClass("li_active");
        $(".goods_b ul>li>div").css("background-color",function(){
            return $(this).attr("color");
        });
        $(".goods_b ul>.li_active").css("border-color",function(){
            return $(this).children().attr("color");
        })
        $(".goods_b>ul").on("click",function(e){
            var $this = $(e.target);
            if($this.is("LI")){
                var $li = $this;
                var index = $li.prevAll().length;
                $li.css("border-color",function(){
                    return $(this).children().attr("color");
                }).siblings().css("border-color","transparent");;
                $($li.parent().siblings("div")[index]).css("display","block").siblings("div").css("display","none");
        
            }else if($this.is("DIV")){
                var index = $this.parent().prevAll().length;
                $this.parent().css("border-color",function(){
                    return $(this).children().attr("color");
                }).siblings().css("border-color","transparent");
                $($this.parent().parent().siblings("div")[index]).css("display","block").siblings("div").css("display","none");
            }
        })
        $(".goods>ul").on("click",function(e){
            var $this = $(e.target);
            if($this.is("LI")){
                var $li = $this;
                var index = $li.prevAll().length+1;
                $li.css("border-color",function(){
                    return $(this).children().attr("color");
                }).siblings().css("border-color","transparent");
                $($li.parent().siblings()[index-1]).css("display","block").siblings("div").css("display","none");
        
            }else if($this.is("DIV")){
                var index = $this.parent().prevAll().length+1;
                $this.parent().css("border-color",function(){
                    return $(this).children().attr("color");
                }).siblings().css("border-color","transparent");
                $($this.parent().parent().siblings()[index-1]).css("display","block").siblings("div").css("display","none");
            }
        })
        $("#tab_list_c>ul").on("mouseover",function(e){
            $this = $(e.target);
            if($this.is("LI")){
                $this.addClass("hover").siblings().removeClass("hover");
                var index = $($($this.parent()).children()).index($this);
                $(`#tab_items${index+1}`).removeClass("dnone").siblings().addClass("dnone");
            }
        })
        $(".goods_b").click(function(){
            window.open("details.html?col_id=1&con_id=1","_self");
        });
        $(".goods_b ul").click(function(e){
            e.stopPropagation();
        });
        $(".item_nomal").click(function(){
            window.open("details.html?col_id=1&con_id=1","_self");
        });
        $(".item_lg").click(function(){
            window.open("details.html?col_id=1&con_id=1","_self");
        });
    };
    //jquery发送ajax请求，获取banner
    !function(){
        $.ajax({
            async : true,
            type : "get",
            url : "/index/banner",
            dataType : "json",
            success : function(data){
                var divs_str = "";
                for(var elem of data){
                    divs_str += `
                        <div class="imgdiv">
                            <img src="/img/${elem.pic_url}" alt="">
                            <div class="banner_title dream" data-animate="fadeIn,1s,linear">
                                <p>${elem.title}</p>
                                <p>${elem.subtitle}</p>
                                <a href="${elem.url}" class="btn">${elem.btn_text}</a>
                            </div>
                        </div>
                    `;
                }
                $("#imgGroup").append($(divs_str));
                $("#imgGroup>div:first-child").css("display","block");
                elem_up();
            }
        })
    }();
    //jquery发送ajax请求完成商品
    !function(){
        $.ajax({
            async : true,
            type : "get",
            url : "/index/product",
            dataType : "json",
            success : function(data){
                console.log(data);
                var goods1 = "";
                for(var elem of data[0]){
                    goods1 += `
                    <div class="goods_in">
                        <img class="dream" data-animate="fadeIn,1s,linear" src="img/${elem.pic_url}" class="" alt="">
                        <div class="tag">${elem.tag_txt}</div>
                        <div class="content_right" style="color:${elem.font_color}">
                            <p class="title">${elem.title}</p>
                            <p class="sub_title">${elem.subtitle}</p>
                            <p class="price">¥${elem.price}</p>
                            <a class="btn" href="${elem.url}">立即购买</a>
                        </div>
                    </div>
                    `;
                };
                var ul1 = `
                    <ul>
                        <li class="li_default li_active" style="border-color:${data[0][0].p_color}"><div color="${data[0][0].p_color}"  style="background:${data[0][0].p_color}"></div></li>
                        <li class="li_default"><div color="${data[0][1].p_color}" style="background:${data[0][1].p_color}"></div></li>
                        <li class="li_default"><div color="${data[0][2].p_color}" style="background:${data[0][2].p_color}"></div></li>
                    </ul>
                `;
                $(".goods:first-child").append($(goods1));
                $(".goods:first-child").append($(ul1));
                var goods2 = "";
                for(var elem of data[1]){
                    goods2 += `
                    <div class="goods_in">
                        <img class="dream" data-animate="fadeIn,1s,linear" src="img/${elem.pic_url}" alt="">
                        <div class="tag">${elem.tag_txt}</div>
                        <div class="content_left" style="color:${elem.font_color}">
                            <p class="title">${elem.title}</p>
                            <p class="sub_title">${elem.subtitle}</p>
                            <p class="price">¥${elem.price}</p>
                            <a class="btn" href="${elem.url}">立即购买</a>
                        </div>
                    </div>
                    `;
                };
                var ul2 = `
                    <ul>
                        <li class="li_default li_active" style="border-color:${data[1][0].p_color}"><div color="${data[1][0].p_color}"  style="background:${data[1][0].p_color}"></div></li>
                        <li class="li_default"><div color="${data[1][1].p_color}" style="background:${data[1][1].p_color}"></div></li>
                        <li class="li_default"><div color="${data[1][2].p_color}" style="background:${data[1][2].p_color}"></div></li>
                        <li class="li_default"><div color="${data[1][3].p_color}" style="background:${data[1][3].p_color}"></div></li>
                    </ul>
                `;
                $(".goods:nth-child(2)").append($(goods2));
                $(".goods:nth-child(2)").append($(ul2));
                var goods3 = "";
                for(var elem of data[2]){
                    goods3 += `
                    <div class="goods_in">
                        <img class="dream" data-animate="fadeIn,1s,linear" src="img/${elem.pic_url}" alt="">
                        <div class="tag">${elem.tag_txt}</div>
                        <div class="content_right" style="color:${elem.font_color}">
                            <p class="title">${elem.title}</p>
                            <p class="sub_title">${elem.subtitle}</p>
                            <p class="price">¥${elem.price}</p>
                            <a class="btn" href="${elem.url}">立即购买</a>
                        </div>
                    </div>
                    `;
                };
                var ul3 = `
                    <ul>
                        <li class="li_default li_active" style="border-color:${data[2][0].p_color}"><div color="${data[1][0].p_color}"  style="background:${data[2][0].p_color}"></div></li>
                        <li class="li_default"><div color="${data[2][1].p_color}" style="background:${data[2][1].p_color}"></div></li>
                        <li class="li_default"><div color="${data[2][2].p_color}" style="background:${data[2][2].p_color}"></div></li>
                        <li class="li_default"><div color="${data[2][3].p_color}" style="background:${data[2][3].p_color}"></div></li>
                    </ul>
                `;
                $(".goods:nth-child(3)").append($(goods3));
                $(".goods:nth-child(3)").append($(ul3));
                var goods_list_2_inner = "";
                for(var i = 3;i<data.length;i++){
                    var a=`<div class="goods_b dream" data-animate="bounceInLeft,0.8s,linear">`;
                    for(var elem of data[i]){
                        a+=`
                        <div>
                            <div class="tag">${elem.tag_txt}</div>
                            <img class="dream" data-animate="fadeIn,1s,linear" src="/img/${elem.pic_url}" alt="">
                            <div>
                                <p class="title">${elem.title}</p>
                                <p class="sub_title">${elem.subtitle}</p>
                                <p class="price">¥${elem.price}</p>
                            </div>
                        </div>
                        `
                    }
                    a += "<ul>";
                    for(var elem of data[i]){
                        a+=`
                            <li class="li_default"><div color="${elem.p_color}"></div></li>
                        `
                    }
                    a+="</ul></div>"
                    goods_list_2_inner += a;
                }
                $("#goods_list_2").append($(goods_list_2_inner));
                elem_up();
            }
        })
    }()
    //jquery发送ajax请求，获取goods_c
    !function(){
        $.ajax({
            async : true,
            type : "get",
            url : "/index/goodsc",
            dataType : "json",
            success : function(data){
                console.log(data[1]);
                var tab_items1a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[0][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[0][0].title}</p>
                            <p>¥${data[0][0].price}</p>
                        </div>
                    </div>`;
                var tab_items1b ="";
                for(var i=1;i<data[0].length;i++){
                    tab_items1b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[0][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[0][i].title}</p>
                            <p class="price">¥${data[0][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items1").append($(tab_items1a)).append($(tab_items1b));
                var tab_items2a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[1][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[1][0].title}</p>
                            <p>¥${data[1][0].price}</p>
                        </div>
                    </div>`;
                var tab_items2b ="";
                for(var i=1;i<data[1].length;i++){
                    tab_items2b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[1][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[1][i].title}</p>
                            <p class="price">¥${data[1][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items2").append($(tab_items2a)).append($(tab_items2b));
                var tab_items3a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[2][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[2][0].title}</p>
                            <p>¥${data[2][0].price}</p>
                        </div>
                    </div>`;
                var tab_items3b ="";
                for(var i=1;i<data[2].length;i++){
                    tab_items3b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[2][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[2][i].title}</p>
                            <p class="price">¥${data[2][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items3").append($(tab_items3a)).append($(tab_items3b));
                var tab_items4a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[3][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[3][0].title}</p>
                            <p>¥${data[3][0].price}</p>
                        </div>
                    </div>`;
                var tab_items4b ="";
                for(var i=1;i<data[3].length;i++){
                    tab_items4b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[3][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[3][i].title}</p>
                            <p class="price">¥${data[3][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items4").append($(tab_items4a)).append($(tab_items4b));
                var tab_items5a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[4][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[4][0].title}</p>
                            <p>¥${data[4][0].price}</p>
                        </div>
                    </div>`;
                var tab_items5b ="";
                for(var i=1;i<data[4].length;i++){
                    tab_items5b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[4][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[4][i].title}</p>
                            <p class="price">¥${data[4][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items5").append($(tab_items5a)).append($(tab_items5b));
                var tab_items6a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[5][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[5][0].title}</p>
                            <p>¥${data[5][0].price}</p>
                        </div>
                    </div>`;
                var tab_items6b ="";
                for(var i=1;i<data[5].length;i++){
                    tab_items6b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[5][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[5][i].title}</p>
                            <p class="price">¥${data[5][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items6").append($(tab_items6a)).append($(tab_items6b));
                var tab_items7a =`
                    <div class="item_lg dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <img src="/img/${data[6][0].pic_url}" alt="">
                        <div class="content">
                            <p>${data[6][0].title}</p>
                            <p>¥${data[6][0].price}</p>
                        </div>
                    </div>`;
                var tab_items7b ="";
                for(var i=1;i<data[6].length;i++){
                    tab_items7b += `
                    <div class="item_nomal dream" data-animate="bounceIn,.8s,linear">
                        <div class="tag">新品</div>
                        <div class="img">
                            <img src="/img/${data[6][i].pic_url}" alt="">
                        </div>
                        <div class="content">
                            <p class="title">${data[6][i].title}</p>
                            <p class="price">¥${data[6][i].price}</p>
                        </div>
                    </div>
                    `;
                }
                $("#tab_items7").append($(tab_items7a)).append($(tab_items7b));
                elem_up();
            }
        })
    }()
    

})
