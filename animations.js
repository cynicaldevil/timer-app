//console.log("fgh");
// var $j = jQuery.noConflict();
$(function() {
$('#left').on('click',function() {
  var animation='animated slideOutLeft';
  var animationobjs='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $('#container > div').addClass(animation).one(animationobjs, function() {
    $(this).removeClass(animation);
    var order;
    console.log($(this).attr('id')+"'s original order: "+$(this).css('order'));
    order=$(this).css('order');
    order+=2;
    order%=3;
    $(this).css('order',order);
    console.log($(this).attr('id')+"'s edited order: "+$(this).css('order'));
    // if(order==0||order===2)
    //   $(this).css('opacity',0);
    // else {
    //   $(this).css('opacity',1);
    // }
    // $('#container > div').each(function(){
    //       console.log($(this).attr('id')+"'s original order: "+$(this).css('order'));
    //       order=$(this).css('order');
    //       order+=2;
    //       order%=3;
    //       $(this).css('order',order);
    //       console.log($(this).attr('id')+"'s edited order: "+$(this).css('order'));
    // });
  });

});
});
