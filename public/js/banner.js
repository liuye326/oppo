$(
  function(){
      !function slide(playtime="4000",count=3){
          var $divs = $(" #imgGroup>div ");
          console.log($divs.length);
          var index = 0;
          var timer;
          //显示图片
          function showImg(){
            var $divs = $(" #imgGroup>div ").css("display","none");
            $($divs[index]).css("display","block");
          }
          //显示导航条
          function showDot(){
              var $dots = $("#clickDot>div>.inner_click").removeClass("toFull");
							$($dots[index]).addClass("toFull")
          }
          //左右箭头点击切换
          $("#next").click(function(){
              if(index == count - 1){
                  index = 0
              }else{
                  index ++
              }
              showImg();
              showDot();
          })
          $("#prev").click(function(){
              if(index == 0){
                  index = count - 1;
              }else{
                  index --
              }
              showImg();
              showDot();
          })

          //点击导航条切换
          $("#clickDot>div").click(function(){
              var myIndex = parseInt($(this).attr('setindex'));
              index = myIndex;
              showImg();
              showDot();
          })
          //自动切换
          function play(){
              timer = setInterval(function(){
                  $("#next").click();
              },playtime);
          }
          function stopPlay(){
              clearInterval(timer);
          }
          //移入鼠标停止，移出鼠标播放
          $("#slide").mouseover(function(){
              stopPlay()
          });
          $("#slide").mouseout(function(){
              play()
          });
      }()
  }
)