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
$logo = $fields['field_logoheader']->content;
$social = isset($_GET['var']);
$link_affiliate = $fields['field_aff_link']->content;

if ( $social == 'social' && $title== 'Bet365'){
    $link_affiliate="https://extra.bet365.dk/promotions/sv/mobile-and-tablet/mobile-sports-live-streaming?affiliate=365_565829";
}

$link_node = url(drupal_get_path_alias('node/' . $fields['nid']->content));
$unibet = '';
if ($title == 'Unibet') {
    $unibet = "<img src='http://adserving.unibet.com/renderImage.aspx?pid=2953744&bid=24211' border=0 style='display:none' />";
}
?>

<div class="book_se">
    <a href="<?php echo $link_affiliate; ?>" target="_blank" rel="nofollow">
        <?php echo $logo; ?>
        <?php echo $unibet; ?>
        <strong class="disp_line less_anchor"><?php echo $title; ?></strong>
        <span role="button" class="disp_line btn btn-default btn_whidth"><?php print t("Play"); ?></span>
    </a>
</div>

