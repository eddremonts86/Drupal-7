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
$field_image = $fields['field_image']->content;
$field_title = $fields['title']->content;
$field_nid = $fields['nid']->content;
$field_url = "node/" . $field_nid;
$path_alias = drupal_get_path_alias($field_url);
$field_ranking = $fields['field_ranking']->content;
$field_bonus_code = $fields['field_bonus_code']->content;
$field_bonus_info_ = $fields['field_bonus_info_']->content;
$field_bet_button = $fields['field_bet_button']->content;
$field_body = $fields['body']->content;
$field_video_quality = $fields['field_video_quality']->content;
$field_video_size = $fields['field_video_size']->content;

?>

<div class=" col-xs-12" style="margin-bottom:15px">
    <div class="back_box" style="padding: 12px">
        <div class="back_img" align="center">
            <?php echo $field_image; ?>
            <hr class="hr_trns">
            <span class="max"><?php echo $field_bonus_code; ?></span>
        </div>
        <div class="back_body">
            <div class="mar_boot" style="width: 90%">
                <div class="h3_to_h1 left"><?php echo $field_title; ?></div>
                <div class="h3_to_h1 right"><?php echo $field_ranking . '/10'; ?></div>
            </div>
            <hr class="hr_trns">
            <div>
                <p class="text_view"><?php echo $field_body; ?></p>
                <a target="_blank" class="BET_rew button" href="<?php echo $field_bet_button; ?>">Bet Now</a>
                <a class="Read_rew button_rew" href="<?php echo $path_alias.'/?amp'; ?>" >Læs Anmeldelse</a>
            </div>
        </div>
    </div>
</div>

