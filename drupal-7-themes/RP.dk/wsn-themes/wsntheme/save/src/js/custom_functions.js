/**
 * Created by edd on 15/7/16.
 */



jQuery(document).ready(function() {
    jQuery('#adv').on('click', function () {
        jQuery('.under-age-new').toggle(500);
    });
    jQuery(document).bind("mouseup touchend", function (e) {
        var containerAge = jQuery('.under18-caution,.under-age-new');
        if (!containerAge.is(e.target)
            && containerAge.has(e.target).length === 0)
        {
            jQuery('.under-age-new').hide();
        }
    });
});