/**
 * Created by eddre on 27/8/2015.
 */
$(document).ready(function () {
    $('.i4ewOd-pzNkMb-haAclf').css("background","rgba(0, 0, 0, 0.2)");
    var height =  $(window).height();
    var width =  $(window).width();
    if(height> 780){height=780;}
    $('#headmapa_down').hide();
    $('header').css("min-height",(height+40) +"px");
    $('headers').css("height","auto");
    $('.header-content-inner').css("margin-top",height/9 +"px");
    $(window).resize(function() {
        $('header').css("min-height",height +"px");
        $('header').css("height","auto");
    });
    $('#headmapa').click(function() {
        $('#headmapa').slideUp(1000);
        $('#headkort').slideUp(1000,function(){
            $('#headmapa_down').fadeIn(1000, function(){
                $('.headkort').css("background","rgba(0, 0, 0, 0.2)");
            });
        });
    });
    $('#headmapa_down').click(function() {
        $('.headkort').css("background","rgba(21, 101, 192, 0.9)");
        $('#headmapa_down').slideDown(1000);
        $('#headkort').slideDown(1000,function(){
            $('#headmapa_down').fadeOut(1000, function(){
                $('#headmapa').fadeIn(1000)
            });
        });
    });

});
