$(function() {
    $('.countdown-timer').on('click',function() {
        $('#container > div').each(function(){
          if($(this).css('order')!=='0')
            $(this).css('display','none');
          else
            $(this).css('display','flex');
          });
      });
      $('.stopwatch').on('click',function() {
          $('#container > div').each(function(){
            if($(this).css('order')!=='1')
              $(this).css('display','none');
            else
              $(this).css('display','flex');
            });
        });
        $('.alarm').on('click',function() {
            $('#container > div').each(function(){

              if($(this).css('order')!=='2')
              {
                $(this).css('display','none');
              }
              else
              {
                $(this).css('display','flex');
              }
              });
          });
});
