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

/* ============ new stuff ============*/
jQuery(document).ready(function(){
    var width =  jQuery( document ).width();
    if(width < 1024){
        jQuery('#list-bookmarkers-main').fadeOut( "slow" );
        jQuery(".list-bookmarkers" ).css( "padding-bottom", "12px" );
        jQuery(".mw80pm_ico_1" ).attr('src' , 'https://www.sportal.se/sites/default/files/mobile_Icon3.png' );
        jQuery(".mw80pm_ico_2" ).attr('src' , 'https://www.sportal.se/sites/default/files/mobile_Icon2.png' );
        jQuery(".mw80pm_ico_3" ).attr('src' , 'https://www.sportal.se/sites/default/files/mobile_Icon1.png' );


        /*----------------------------Pool background ----------------------------------------------
        var img = " <div class='img_backg'><img src='http://sportal.se/sites/all/themes/sportaltheme/files/img/imgs-pool/Sportalpool.png' class='img_pool' style='width: 100%;'></div>";
        jQuery( "body > div.container > main > article > div:nth-child(2) > div > div.poll" ).before(img);
        jQuery( "#poll-view-voting--3 > div" ).before(img);
        */
    }
    jQuery('#arrow_up').on( "click", function() {
        jQuery("#list-bookmarkers-main" ).fadeToggle( "50",
            function () {
                jQuery('#arrow_up').toggleClass('active_');
            }
        );
    });
});