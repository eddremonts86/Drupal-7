/* global jQuery */
var app = (function($,window,document){

  var  w_w_min = 769;

  function initEqualizer(el_parent,el_col){
    if($(el_parent).length){
      var max_height = 0;
      $(el_col).each(function(index,el){
        var $el = $(el);
        var h_el = parseInt($el.outerHeight(),10);
        if(h_el > max_height){
          max_height = h_el;
        }
      });
      $(el_col).height(max_height);
    }
  }


  function showTopBookmakers(){
     var w_w = parseInt($(window).width(),10);
    if(w_w <= w_w_min){
    var b_h =  $('.list-bookmarkers').outerHeight();
    var b_h_n_active =  parseInt($('.list-bookmarkers h2').outerHeight(),10) + parseInt($('.list-bookmarkers li:first').outerHeight(),10);
    //console.log(b_h_n_active);
    //console.log(b_h);
    $('.list-bookmarkers').find('h2').off('click');
     $('.list-bookmarkers').css('max-height',b_h_n_active);
     $('.list-bookmarkers').find('h2').on('click', function(){

        
         
            var $el = $(this).parent().parent();
            if($el.hasClass('active')){
              $('.list-bookmarkers').css('max-height',b_h_n_active);
              $el.removeClass('active');
            } else {
              $('.list-bookmarkers').css('max-height',b_h);
              $el.addClass('active');
            }
         
     });
     } else {
      $('.list-bookmarkers').css('max-height','initial');
     }
  }

  function initFixedItem(element,class_active){

  /*
   if(typeof class_active ==='undefined'){ class_active = 'fixed';}
    var elementPosition = $(element).offset();

    $(window).scroll(function(){
        if($(window).scrollTop() > elementPosition.top){
            $(element).addClass('fixed');
            $(element).css('left',elementPosition.left);
        } else {
            $(element).removeClass('fixed');
            $(element).css('left','initial');
        }
    });
  */
 /*
 var w_w = parseInt($(window).width(),10);
   if(w_w < w_w_min){
      $(element).trigger('detach.ScrollToFixed');
   } else {
     $(element).scrollToFixed();
   }
   */

    $(element).scrollToFixed();
  }

  function initRwd(){
      showTopBookmakers();
      //control fixed sidebar
     var w_w = parseInt($(window).width(),10);
     if(w_w < w_w_min){
      $('article.main .row-cols.main .col-side').addClass('m-rwd');
      var $position = $('article.main .row:last').prev();
      $('article.main .row-cols.main .col-side').insertAfter($position);

      $('.list-items-simple-media').insertAfter($('article.main > .col-side > aside.media'));

      //change time new style mobile list
      $('.block-list-articles .list-last article').each(function(i){
        var $el = $(this).find('time');
        $el.insertAfter($el.parent().parent().find('.thumbnail a'));
      });
      $('.row.list-cols.cols3 article').each(function(i){
        var $el = $(this).find('time');
        $el.insertAfter($el.parent().parent().find('.thumbnail a'));
      });

      //change position block list-bookmakers
      $('.list-bookmarkers').appendTo('body');

     } else {
       $('article.main > .col-side').prependTo('article.main .row-cols.main');
       $('article.main > .col-side').removeClass('m-rwd');
       $('.list-items-simple-media').prependTo($('.list-items-simple-media').parent());

       //recovery position time list blocks
        $('.block-list-articles .list-last article').each(function(i){
          var $el = $(this).find('time');
          $el.insertAfter($el.parent().parent().find('.caption p'));
        });
        $('.row.list-cols.cols3 article').each(function(i){
          var $el = $(this).find('time');
          $el.insertAfter($el.parent().parent().find('.caption p'));
        });

        //recovery position block list-bookmakers
        $('.list-bookmarkers').prependTo('sidebar.main');
     }
   }


  // Event handlers
  function initDomloader(){
    //initFixedItem('sidebar.main');
    $('sidebar.main').fixTo('article.main');
    initRwd();
    showTopBookmakers();
  }
  function initWindowLoader(){
    //initEqualizer('.list-tops .row','.list-tops .row > article');
    $('.list-cols.cols3 > article').matchHeight();
    $('.list-tops .row > article').matchHeight();
    $('.list-last > article').matchHeight();
    if($(window).width() >= w_w_min){
      //initEqualizer('.list-cols.cols3','.list-cols.cols3 > article');
      //initEqualizer('.list-last','.list-last > article');
    }
  }
  function initResizeWindow(){
    initRwd();
  }
  return {
    initDOM: initDomloader,
    initWindow: initWindowLoader,
    resizeWindow: initResizeWindow,
  };
}(jQuery,window,document));



// Event handlers
jQuery(document).ready(function(){
    app.initDOM();
});
jQuery(window).ready(function(){
    app.initWindow();
});
jQuery(window).resize(function() {
    app.resizeWindow();
});