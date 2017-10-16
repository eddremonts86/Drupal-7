/* global jQuery */
var app_sportal = (function($,window,document){
  console.log('app_sportal');

  function initMenuDropDown(){
    var w_w = $(window).width();
    var $menu = $('#wsn-main-menu');
    if(w_w > 768){
      $menu.addClass('r_td');
      $menu.removeClass('r_m');
    } else {
      $menu.addClass('r_m');
      $menu.removeClass('r_td');
    }
     var $menu_dd = $('#wsn-main-menu.r_td nav');
     $menu_dd.find('> ul > li').mouseenter(function(){
        if(!$('.navbar-toggle').is(':visible')) { // disable for mobile view
            if(!$(this).hasClass('open')) { // Keeps it open when hover it again
                $('.dropdown-toggle', this).trigger('click');
            }
        }
     });
     $menu_dd.mouseout(function(){
      $menu_dd.find('li').removeClass('open');
     });
  }
  // Event handlers
  function initDomloader(){
   initMenuDropDown();
  }
  function initWindowLoader(){
  }
  function initResizeWindow(){
    initMenuDropDown();
  }
  return {
    initDOM: initDomloader,
    initWindow: initWindowLoader,
    resizeWindow: initResizeWindow,
  };
}(jQuery,window,document));



// Event handlers
jQuery(document).ready(function(){
    app_sportal.initDOM();
});
jQuery(window).ready(function(){
    app_sportal.initWindow();
});
jQuery(window).resize(function() {
    app_sportal.resizeWindow();
});