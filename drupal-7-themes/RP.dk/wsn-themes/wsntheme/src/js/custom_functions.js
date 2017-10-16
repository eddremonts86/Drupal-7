/**
 * Created by edd on 15/7/16.
 */
jQuery(document).ready(function() {

    jQuery('#adv').on('click', function () {
        jQuery('.under-age-new').toggle(500);
    });

    jQuery('#Underage').on('click', function () {
        jQuery('.under-age-Underage').toggle(500);
    });

    jQuery(document).bind("mouseup touchend", function (e) {
        var containerAge = jQuery('.under18-caution,.under');
        if (!containerAge.is(e.target)
            && containerAge.has(e.target).length === 0)
        {
            jQuery('.under').hide();
        }
    });

    var time = Date.now();;
    jQuery.getJSON("https://www.wsn.com/sites/all/themes/wsntheme/includes/geoip_locale.php?"+time, function (data) {
        jQuery('.list-bookmarkers').html(data);
    })

});