<?php
/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */

$title = $fields['title']->content;
$country = $fields['field_country']->content;
$field_fr_affiliate_link = $fields['field_fr_affiliate_link']->content;
$logo = $fields['field_logo']->content;
$link_affiliate = $fields['field_affiliate_link']->content;
$link_node = url(drupal_get_path_alias('node/' . $fields['nid']->content));

$country_array = array();
$country_array = explode(",", $country);
if (!$country_array) {
    $country = trim($country, "\t\n\r\0\x0B");
    $country_array[] = $country;
}
for ($i = 0; $i < count($country_array); $i++) {
    if ("All" == $country_array[$i] || ' ' . geoip_country_code() == $country_array[$i] || geoip_country_code() == $country_array[$i]) {
        $book = true;
        break;
    } else {
        $book = false;
    }
}
?>

<?php if ($book && geoip_country_code() == 'FR') { ?>

    <li class="view-empty-rols">
        <div class="book_se">
            <a target="_blank" rel="nofollow" href="<?php echo $field_fr_affiliate_link; ?>"><?php echo $logo; ?></a>
            <strong><a target="_blank" rel="nofollow"
                       href="<?php echo $field_fr_affiliate_link; ?>"><?php echo $title; ?></a></strong>
            <a href="<?php echo $field_fr_affiliate_link ?>" target="_blank" rel="nofollow" role="button"
               class="btn_boock btn btn-default"><?php print t("Bet now"); ?></a>
        </div>
    </li>

<?php } if ($book && geoip_country_code() == 'DK') { ?>

    <li class="view-empty-rols">
        <div class="book_se">
            <a href="<?php echo $link_node; ?>"><?php echo $logo; ?></a>
            <strong><a href="<?php echo $link_node; ?>"><?php echo $title; ?></a></strong>
            <a href="<?php echo $link_affiliate ?>" target="_blank" rel="nofollow" role="button"
               class="btn_boock btn btn-default"><?php print t("Bet now"); ?></a>
        </div>
    </li>

<?php } if (geoip_country_code() != 'DK' && geoip_country_code() != 'FR') {?>
    <li class="view-empty-rols">
        <div class="book_se">
            <a href="<?php echo $link_node; ?>"><?php echo $logo; ?></a>
            <strong><a href="<?php echo $link_node; ?>"><?php echo $title; ?></a></strong>
            <a href="<?php echo $link_affiliate ?>" target="_blank" rel="nofollow" role="button"
               class="btn_boock btn btn-default"><?php print t("Bet now"); ?></a>
        </div>
    </li>
<?php } ?>
