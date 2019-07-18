$.ajax({
    url:"header.html",
    type:"get"
}).then(function(result){
    $(result).replaceAll($("header"));
    $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo($("head"));
    $(function(){
        $(".navigator>ul>li:lt(5)").mouseover(function () {
            $(".navigator").css("background", "#fff");
            $(".navigator a").css("color", "#000");
            $(".navigator>.dropdown").css("height", "180px");
            $("#nav_right img").attr("src","img/shopping_b.png")
        });
        $(".navigator").mouseleave(function () {
            $(".navigator>.dropdown").css("height", "0px");
            setTimeout(function () {
                $(".navigator").css("background", "transparent");
                $(".navigator a").css("color", "#fff");
                $("#nav_right img").attr("src","img/shopping_w.png")
            }, 500);
        })
        $("#on-off").click(function(){
            $("ul.ul_md").slideToggle();
        });
        $("#nav_right img").click(function(){
            var $open = $(".open");
            console.log(1);
            if(!$(".open").is(".active")){
                $(".open").addClass("active");
            }else{
                $(".open").removeClass("active");
            }
        })
    })
})
