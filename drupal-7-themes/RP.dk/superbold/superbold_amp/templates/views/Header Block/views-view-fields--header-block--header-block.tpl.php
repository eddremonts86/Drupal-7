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
$field_nid= $fields['nid']->content;
$field_url="node/".$field_nid;
$path_alias = drupal_get_path_alias($field_url);
$field_ranking = $fields['field_ranking']->content;
$field_bonus_code = $fields['field_bonus_code']->content;
$field_bonus_info_ = $fields['field_bonus_info_']->content;
$field_bet_button = $fields['field_bet_button']->content;
$field_body = $fields['body']->content;
$field_video_quality = $fields['field_video_quality']->content;
$field_video_size = $fields['field_video_size']->content;

?>

<div class="hero_div col-xs-12">
    <div class="hero-img" align="center">
        <?php echo $field_image; ?>
    </div>
    <div class="hero-item-body">
        <header >
            <span class="hero-item-title title"><?php echo $field_title; ?></span>
            <span class="hero-item-rating"><?php echo $field_ranking; ?></span>
        </header>

        <ul>
            <span class="col-xs-12_plus">
            <li style="width: 25%; margin-right: 2%" class="bonus"><strong><?php echo $field_bonus_code; ?></strong></li>
            </span>
            <span class="col-xs-12_plus">
             <li style="width: 25%; margin-right: 2%"><?php echo $field_bonus_info_; ?></li>
            </span>
            <span class="col-xs-12_plus">
            <li style="width: 15%; margin-right: 2%"><?php echo $field_video_quality; ?></li>
            <li style="width: 15%; margin-right: 2%"><?php echo $field_video_size; ?></li>
            </span>
        </ul>

        <p><?php echo $field_body; ?></p>
        <a target="_blank" href="<?php echo $field_bet_button; ?>" class="button">Bet Now</a>
        <a href="<?php echo $path_alias; ?>/?amp" class="button_rew">Læs Anmeldelse</a>
    </div>
</div>



