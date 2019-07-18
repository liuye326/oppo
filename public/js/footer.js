$.ajax({
  url:"footer.html",
  type:"get"
}).then(function(result){
  $(result).replaceAll($("footer"));
  $(`<link rel="stylesheet" href="css/footer.css"/>`).appendTo($("head"));
  $(function(){
    $(".list").click(function(e){
      var $this = $(e.target);
      if($this.is("a")){
        if(!$this.is(".active")){
          $this.addClass("active")
          var count = $this.parent().parent().children().length;
          $(".list ul img").attr("src","./img/open.png");
          $this.parent().parent().css("height",count*32).siblings().css("height",32);
          $this.children().attr("src","./img/close.png")
          console.log(000)
        }else{
          $this.removeClass("active").parent().parent().css("height",32);
          $(".list ul img").attr("src","./img/open.png");
          console.log(111)
        }
    
      }
    })
  })
})
